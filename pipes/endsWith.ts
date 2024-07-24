import { failure } from "../schema.ts";
import type { Pipe } from "../schemas.ts";

export const VALIDATION_END_WITH = "VALIDATION_END_WITH";

/**
 * Check the `value` ends with `search`.
 * @example
 * ```ts
 * const HelloWorldSchema = pipe(string(), endsWith("world"));
 * ```
 */
export function endsWith(expected: string): Pipe<string> {
  return function (value: string) {
    if (value.endsWith(expected)) {
      return value;
    }

    return failure({
      reason: "VALIDATION",
      validation: VALIDATION_END_WITH,
      expected,
    });
  };
}
