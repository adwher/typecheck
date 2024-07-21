import { failure } from "../schema.ts";
import type { Pipe } from "../schemas/pipe.ts";

export const VALIDATION_NEGATIVE = "VALIDATION_NEGATIVE";

/**
 * Check the `value` as a negative number.
 */
export function isNegative(): Pipe<number> {
  return function (value: number) {
    if (value < 0) {
      return value;
    }

    return failure({
      reason: "VALIDATION",
      validation: VALIDATION_NEGATIVE,
      expected: "negative",
      received: value,
    });
  };
}
