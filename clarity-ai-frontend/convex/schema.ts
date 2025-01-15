// Convex schema for the application
import { authTables } from '@convex-dev/auth/server';
import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
	...authTables,
  // User collection
  user: defineTable({
    organization_id: v.id('organization'), // Foreign key to Organization
    email: v.string(),
    password_hash: v.string(),
    name: v.string(),
    role: v.string().oneOf(['ADMIN', 'MEMBER']),
    profile: v.object({
      contact_details: v.string(),
      profile_picture: v.string().optional(),
    }),
    created_at: v.string(),
    updated_at: v.string(),
  }),

  // Organization collection
  organization: defineTable({
    name: v.string(),
    created_at: v.string(),
    updated_at: v.string(),
  }),

  // Subscription collection
  subscription: defineTable({
    organization_id: v.id('organization'), // Foreign key linking to Organization
    plan: v.string().oneOf(['BASIC', 'PRO', 'ENTERPRISE']),
    status: v.string().oneOf(['ACTIVE', 'CANCELLED', 'PAST_DUE']),
    start_date: v.string(),
    end_date: v.string(),
    payment_method: v.object({
      type: v.string(), // e.g., "card", "paypal"
      last4: v.optional(v.string()), // Last 4 digits of card
      token: v.string(), // Token from payment provider
    }),
    created_at: v.string(),
    updated_at: v.string(),
  }),

  // Data Source collection
  data_source: defineTable({
    organization_id: v.id('organization'),
    user_id: v.id('users'),
    type: v.string().oneOf(['URL', 'PDF', 'VIDEO']),
    metadata: v.object({
      title: v.string(),
      description: v.optional(v.string()),
    }),
    chunks: v.array(v.object({
      chunk_id: v.string(),
      text: v.string(),
      embedding: v.array(v.number()),
    })),
    created_at: v.string(),
    updated_at: v.string(),
  }),

  // Widget collection
  widget: defineTable({
    organization_id: v.id('organization'),
    name: v.string(),
    data_source_ids: v.array(v.id('data_source')),
    color_scheme: v.object({
      primary: v.string(),
      secondary: v.string(),
    }),
    analytics: v.object({
      clicks: v.number(),
      chat_sessions: v.number(),
      common_questions: v.array(v.string()),
    }),
    created_at: v.string(),
    updated_at: v.string(),
  }),

  // Integration collection
  integration: defineTable({
    organization_id: v.id('organization'),
    type: v.string().oneOf(['SLACK', 'WHATSAPP', 'ZAPIER']),
    metadata: v.object({
      configuration: v.object({}),
    }),
    created_at: v.string(),
    updated_at: v.string(),
  }),

  // Onboarding Steps collection
  onboarding_step: defineTable({
    step_id: v.string(),
    organization_id: v.id('organization'),
    step_name: v.string(),
    completed: v.boolean(),
    created_at: v.string(),
    updated_at: v.string(),
  }),
});
