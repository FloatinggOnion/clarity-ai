import { CheerioAPI, load } from "cheerio";
import { v } from "convex/values";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { asyncMap as map } from "modern-async";
import { internal } from "../_generated/api";
import { internalAction, internalMutation } from "../_generated/server";
import { Doc } from "../_generated/dataModel";
import { Url } from "url";
import { toast } from "@/components/hooks/use-toast";

export const scrape = internalAction({
	args: {
		url: v.string(), // This can be a sitemap URL or a base URL
		limit: v.optional(v.number()),
		depth: v.optional(v.number()), // Depth for crawling when sitemap is not available
	},
	handler: async (ctx, { url, limit = 100, depth = 2 }) => {
		try {
			const response = await fetch(url);
			const contentType = response.headers.get("content-type");

			if (contentType?.includes("xml")) {
				//   console.log("Sitemap detected. Using sitemap scraper.");
				toast({
					title: "Sitemap detected",
					description: "Using sitemap scraper",
					duration: 5000, // 5 seconds
				});
				await scrapeFromSitemap(ctx, url, limit);
			} else {
				//   console.log("No sitemap detected. Using base URL crawler.");
				toast({
					title: "No sitemap detected",
					description: "Using base URL crawler",
					duration: 5000, // 5 seconds
				});
				await scrapeFromBaseUrl(ctx, url, limit, depth);
			}
		} catch (error) {
			console.error(`Error processing URL ${url}:`, error);
		}
	},
});

async function scrapeFromSitemap(ctx: any, sitemapUrl: string, limit?: number) {
	const response = await fetch(sitemapUrl);
	const xml = await response.text();
	const $ = load(xml, { xmlMode: true });
	const urls = $("url > loc")
		.map((_i, elem) => $(elem).text())
		.get()
		.slice(0, limit);

	await map(urls as any, (url: Url) =>
		ctx.scheduler.runAfter(0, internal.ingest.load.fetchSingle, { url })
	);
	toast({
		title: "Sitemap scraping completed",
		duration: 5000,
	});

}

async function scrapeFromBaseUrl(
	ctx: any,
	baseUrl: string,
	limit: number,
	depth: number
) {
	const visited = new Set<string>();
	let urlCount = 0;

	const crawl = async (url: string, currentDepth: number) => {
		if (urlCount >= limit || currentDepth > depth || visited.has(url))
			return;

		visited.add(url);
		urlCount++;

		try {
			const response = await fetch(url);
			const html = await response.text();
			const $ = load(html);

			// Extract text and store it
			const text = parsePage(html, baseUrl);
			if (text.length > 0) {
				await ctx.runMutation(internal.ingest.load.updateDocument, {
					url,
					text,
				});
			}

			// Extract links and follow them
			const links = $("a[href]")
				.map((_i, el) => $(el).attr("href"))
				.get()
				.filter((href) => href && !href.startsWith("#")) // Skip anchors
				.map((href) => new URL(href, baseUrl).toString()) // Resolve relative URLs
				.filter(
					(link) =>
						new URL(link).hostname === new URL(baseUrl).hostname
				); // Same domain only

			await map(links, (link: any) => crawl(link, currentDepth + 1));
		} catch (error) {
			console.error(`Error scraping ${url}:`, error);
		}
	};

	await crawl(baseUrl, 0);
	toast({
		title: "Website scraping completed",
		duration: 5000,
	});
}

export const fetchSingle = internalAction({
	args: {
		url: v.string(),
	},
	handler: async (ctx, { url }) => {
		const response = await fetch(url);
		const text = parsePage(await response.text(), url);
		if (text.length > 0) {
			await ctx.runMutation(internal.ingest.load.updateDocument, {
				url,
				text,
			});
		}
	},
});

export const updateDocument = internalMutation(
	async (ctx, { url, text }: { url: string; text: string }) => {
		const latestVersion = await ctx.db
			.query("documents")
			.withIndex("byUrl", (q) => q.eq("url", url))
			.order("desc")
			.first();

		const hasChanged =
			latestVersion === null || latestVersion.text !== text;
		if (hasChanged) {
			const documentId = await ctx.db.insert("documents", { url, text });
			const splitter = RecursiveCharacterTextSplitter.fromLanguage(
				"markdown",
				{
					chunkSize: 2000,
					chunkOverlap: 100,
				}
			);
			const chunks = await splitter.splitText(text);
			await map(chunks, async (chunk: any) => {
				await ctx.db.insert("chunks", {
					documentId,
					text: chunk,
					embeddingId: null,
				});
			});
		}
	}
);

export const eraseStaleDocumentsAndChunks = internalMutation({
	args: {
		forReal: v.boolean(),
	},
	handler: async (ctx, args) => {
		const allDocuments = await ctx.db
			.query("documents")
			.order("desc")
			.collect();
		const byUrl: Record<string, Doc<"documents">[]> = {};
		allDocuments.forEach((doc) => {
			byUrl[doc.url] ??= [];
			byUrl[doc.url].push(doc);
		});
		await map(Object.values(byUrl), async (docs: any) => {
			if (docs.length > 1) {
				await map(docs.slice(1), async (doc: any) => {
					const chunks = await ctx.db
						.query("chunks")
						.withIndex("byDocumentId", (q) =>
							q.eq("documentId", doc._id)
						)
						.collect();
					if (args.forReal) {
						await ctx.db.delete(doc._id);
						await map(chunks, (chunk: any) =>
							ctx.db.delete(chunk._id)
						);
					} else {
						console.log(
							"Would delete",
							doc._id,
							doc.url,
							new Date(doc._creationTime),
							"chunk count: " + chunks.length
						);
					}
				});
			}
		});
	},
});

function parsePage(text: string, baseUrl: string) {
	const $ = load(text);
	return parse($, $(".markdown"), baseUrl)
		.replace(/(?:\n\s+){3,}/g, "\n\n")
		.trim();
}

const parse = ($: CheerioAPI, element: any, baseUrl: string) => {
	let result = "";

	$(element)
		.contents()
		.each((_, el) => {
			// eslint-disable-next-line
			if (el.type === "text") {
				result += $(el).text().trim() + " ";
				return;
			}
			const tagName = (el as any).tagName;
			switch (tagName) {
				case "code":
					if ($(el).has("span").length > 0) {
						result +=
							"```\n" +
							$(el)
								.children()
								.map((_, line) => $(line).text())
								.get()
								.join("\n") +
							"\n```\n";
						return;
					}
					result += " `" + $(el).text() + "` ";
					return;
				case "a": {
					if ($(el).hasClass("hash-link")) {
						return;
					}
					let href = $(el).attr("href")!;
					if (href.startsWith("/")) {
						href = baseUrl + href;
					}
					result += " [" + $(el).text() + "](" + href + ") ";
					return;
				}
				case "strong":
				case "em":
					result += " " + $(el).text() + " ";
					return;
				case "h1":
				case "h2":
				case "h3":
				case "h4":
				case "h5":
					result +=
						"#".repeat(+tagName.slice(1)) +
						" " +
						$(el).text() +
						"\n\n";
					return;
			}
			result += parse($, el, baseUrl);
			result += "\n\n";
		});

	return result;
};
