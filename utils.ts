// Copyright (c) 2024 Andres Celis. MIT license.

/**
 * @module utils
 * Utilities to check and use the schemas.
 * @example
 * ```ts
 * import { safeParse, isSuccess } from "typecheck/utils";
 * import { date } from "typecheck/schemas";
 *
 * const schema = date();
 * const value = new Date();
 *
 * const commit = safeParse(value, schema);
 *
 * if (isSuccess(commit)) {
 *  await save(commit.value);
 * }
 */

export * from "./utils/check.ts";
export * from "./utils/createGuard.ts";
export * from "./utils/createJSONSchema.ts";
export * from "./utils/describe.ts";
export * from "./utils/isFailure.ts";
export * from "./utils/isSuccess.ts";
export * from "./utils/merge.ts";
export * from "./utils/omit.ts";
export * from "./utils/parse.ts";
export * from "./utils/partial.ts";
export * from "./utils/pick.ts";
export * from "./utils/safeParse.ts";
