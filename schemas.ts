// Copyright (c) 2024 Andres Celis. MIT license.

/**
 * @module schemas
 * Built-in collection of schemas.
 * @example
 * ```ts
 * import { string, number, object, array } from "typecheck/schemas";
 *
 * const UserSchema = object({
 *  name: string(),
 *  age: number(),
 *  friends: array(string()),
 * });
 */

export * from "./schemas/array.ts";
export * from "./schemas/boolean.ts";
export * from "./schemas/custom.ts";
export * from "./schemas/date.ts";
export * from "./schemas/either.ts";
export * from "./schemas/enumerated.ts";
export * from "./schemas/lazy.ts";
export * from "./schemas/literal.ts";
export * from "./schemas/never.ts";
export * from "./schemas/nullable.ts";
export * from "./schemas/number.ts";
export * from "./schemas/object.ts";
export * from "./schemas/optional.ts";
export * from "./schemas/pipe.ts";
export * from "./schemas/record.ts";
export * from "./schemas/strict.ts";
export * from "./schemas/string.ts";
export * from "./schemas/transform.ts";
export * from "./schemas/tuple.ts";
export * from "./schemas/unknown.ts";
