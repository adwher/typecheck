import { failure } from "../schema.ts";
import type { Pipe } from "../schemas/pipe.ts";

export const VALIDATION_LENGTH = "VALIDATION_LENGTH";

/**
 * Create a pipe that validates the `length` of the given `value` to be equal to `expected`.
 */
export function length<T extends string | unknown[]>(
  expected: number,
): Pipe<T> {
  return function (value: T) {
    if (value.length === expected) {
      return value;
    }

    return failure({
      reason: "VALIDATION",
      validation: VALIDATION_LENGTH,
      received: value.length,
      expected,
    });
  };
}
