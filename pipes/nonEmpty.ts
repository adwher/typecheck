import type { Pipe } from "../schemas/pipe.ts";
import { failure } from "../schema.ts";

export const VALIDATION_NON_EMPTY = "VALIDATION_NON_EMPTY";

/**
 * Returns a pipe that checks if a value is non-empty.
 * If the value is non-empty, it returns the value itself.
 * If the value is empty, it returns a failure object with the validation details.
 * @returns A pipe that checks if a value is non-empty.
 */
export function nonEmpty<T extends string | unknown[]>(): Pipe<T> {
  // deno-lint-ignore no-explicit-any
  return function (value: any) {
    if (value.length > 0) {
      return value;
    }

    return failure({
      reason: "VALIDATION",
      validation: VALIDATION_NON_EMPTY,
      received: value.length,
    });
  };
}
