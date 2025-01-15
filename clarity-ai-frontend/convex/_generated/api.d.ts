/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as auth from "../auth.js";
import type * as helpers from "../helpers.js";
import type * as http from "../http.js";
import type * as ingest_embed from "../ingest/embed.js";
import type * as ingest_load from "../ingest/load.js";
import type * as ingest_upload from "../ingest/upload.js";
import type * as resendOTPPasswordReset from "../resendOTPPasswordReset.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  helpers: typeof helpers;
  http: typeof http;
  "ingest/embed": typeof ingest_embed;
  "ingest/load": typeof ingest_load;
  "ingest/upload": typeof ingest_upload;
  resendOTPPasswordReset: typeof resendOTPPasswordReset;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
