import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	// authTables contains the tables for user authentication
	...authTables,

	messages: defineTable({
		// Whether the message is from the AI or the human
		isViewer: v.boolean(),
		// Which conversation this message belongs to
		sessionId: v.string(),
		// Message content
		text: v.string(),
	}).index("bySessionId", ["sessionId"]),

	documents: defineTable({
		// The original page URL for the document
		url: v.string(),
		// The parsed document content
		text: v.string(),
	}).index("byUrl", ["url"]),

	chunks: defineTable({
		// Which document this chunk belongs to
		documentId: v.id("documents"),
		// The chunk content
		text: v.string(),
		// If the chunk has been embedded, which embedding corresponds to it
		embeddingId: v.union(v.id("embeddings"), v.null()),
	})
		.index("byDocumentId", ["documentId"])
		.index("byEmbeddingId", ["embeddingId"]),

	// the actual embeddings
	embeddings: defineTable({
		embedding: v.array(v.number()),
		chunkId: v.id("chunks"),
	})
		.index("byChunkId", ["chunkId"])
		.vectorIndex("byEmbedding", {
			vectorField: "embedding",
			dimensions: 1536,
		}),
});


/*  // custom user table example...if you need it
        users: defineTable({
        name: v.optional(v.string()),
        image: v.optional(v.string()),
        email: v.optional(v.string()),
        emailVerificationTime: v.optional(v.number()),
        phone: v.optional(v.string()),
        phoneVerificationTime: v.optional(v.number()),
        isAnonymous: v.optional(v.boolean()),
        // other "users" fields...
    }).index("email", ["email"]),
     */