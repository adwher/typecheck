// Copyright (c) 2024 Andres Celis. MIT license.

/**
 * @module
 * This module exports all the pipes.
 * @example
 * ```ts
 * import { string, pipe } from "typecheck/schemas";
 * import { isEmail } from "typecheck/pipes";
 *
 * const schema = pipe(string(), isEmail());
 * ```
 */

export * from "./pipes/isDateTime.ts";
export * from "./pipes/isEmail.ts";
export * from "./pipes/isInteger.ts";
export * from "./pipes/isMatch.ts";
export * from "./pipes/isNegative.ts";
export * from "./pipes/isPositive.ts";
export * from "./pipes/isURL.ts";
export * from "./pipes/length.ts";
export * from "./pipes/maxLength.ts";
export * from "./pipes/maxValue.ts";
export * from "./pipes/minLength.ts";
export * from "./pipes/minValue.ts";
export * from "./pipes/toCapitalize.ts";
export * from "./pipes/toLowerCase.ts";
export * from "./pipes/toTrimmed.ts";
export * from "./pipes/toUpperCase.ts";
