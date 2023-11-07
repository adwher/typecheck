import { createContext } from "../context.ts";
import { SchemaError } from "../errors.ts";
import { Schema } from "../schema.ts";

/** Use when the `value` satifies the `schema`. */
export interface ParsePositive<T> {
  success: true;
  data: T;
}

/** Use when the `value` not satifies the `schema`. */
export interface ParseNegative {
  success: false;
  error: SchemaError;
}

export type SafeParse<T> = ParsePositive<T> | ParseNegative;

/**
 * Check the `value` with the given `schema` and return the result.
 * @returns Object with the validation of the given `schema`.
 */
export function safeParse<T>(
  value: unknown,
  schema: Schema<T>,
): SafeParse<T> {
  const context = createContext();
  const output = schema.check(value, context);

  if (output instanceof SchemaError) {
    return {
      success: false,
      error: output,
    };
  }

  return {
    success: true,
    data: output,
  };
}
