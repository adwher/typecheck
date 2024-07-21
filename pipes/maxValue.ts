import { failure } from "../schema.ts";
import type { Pipe } from "../schemas/pipe.ts";

export const VALIDATION_MAX_VALUE = "VALIDATION_MAX_VALUE";

/**
 * Create a pipe that validates the `value`.
 */
export function maxValue(expected: number): Pipe<number> {
  return function (value) {
    if (value < expected) {
      return value;
    }

    return failure({
      reason: "VALIDATION",
      validation: VALIDATION_MAX_VALUE,
      received: value,
      expected,
    });
  };
}
