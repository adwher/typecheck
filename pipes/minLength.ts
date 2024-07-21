import type { Pipe } from "../schemas/pipe.ts";
import { failure } from "../schema.ts";

export const VALIDATION_MIN_LENGTH = "VALIDATION_MIN_LENGTH";

/**
 * Create a pipe that validates the `length` of the given `value`.
 */
export function minLength<T extends string | unknown[]>(
  expected: number,
): Pipe<T> {
  return function (value) {
    if (value.length > expected) {
      return value;
    }

    return failure({
      reason: "VALIDATION",
      validation: VALIDATION_MIN_LENGTH,
      received: value.length,
      expected,
    });
  };
}
