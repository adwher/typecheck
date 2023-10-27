import { createContext } from "../context.ts";
import { Schema } from "../schema.ts";

/**
 * Parse the `value` with the given `schema` and return the result.
 * @throws An error in cases where the `value` does not satisfies the `schema`.
 * @returns Parsed `value` with the given `schema`.
 */
export function parse<T>(value: unknown, schema: Schema<T>) {
  const context = createContext();
  const output = schema.check(value, context);

  if (output instanceof Error) {
    throw output;
  }

  return output;
}
