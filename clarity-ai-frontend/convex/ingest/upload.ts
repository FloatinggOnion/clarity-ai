import { mutation } from "../_generated/server";
import { convexToJson, v } from "convex/values";
import { scrape } from "./load";


export const uploadURL = mutation({
    args: { url: v.string() },
    handler: async (ctx, args) => {
        scrape(ctx, args.url)
    }
})