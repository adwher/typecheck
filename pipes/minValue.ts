import { failure } from "../schema.ts";
import type { Pipe } from "../schemas/pipe.ts";

export const VALIDATION_MIN_VALUE = "VALIDATION_MIN_VALUE";

/**
 * Create a pipe that validates the `value`.
 */
export function minValue(expected: number): Pipe<number> {
  return function (value: number) {
    if (value > expected) {
      return value;
    }

    return failure({
      reason: "VALIDATION",
      validation: VALIDATION_MIN_VALUE,
      received: value,
      expected,
    });
  };
}
