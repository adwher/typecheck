import { failure } from "../schema.ts";
import type { Pipe } from "../schemas/pipe.ts";

export const VALIDATION_MAX_LENGTH = "VALIDATION_MAX_LENGTH";

/**
 * Create a pipe that validates the `length` of the given `value`.
 */
export function maxLength<T extends string | unknown[]>(
  expected: number,
): Pipe<T> {
  return function (value) {
    if (value.length < expected) {
      return value;
    }

    return failure({
      reason: "VALIDATION",
      validation: VALIDATION_MAX_LENGTH,
      received: value.length,
      expected,
    });
  };
}
