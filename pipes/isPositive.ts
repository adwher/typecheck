import { failure } from "../schema.ts";
import type { Pipe } from "../schemas/pipe.ts";

export const VALIDATION_POSITIVE = "VALIDATION_POSITIVE";

/**
 * Check the `value` as a positive number.
 */
export function isPositive(): Pipe<number> {
  return function (value: number) {
    if (value >= 0) {
      return value;
    }

    return failure({
      reason: "VALIDATION",
      validation: VALIDATION_POSITIVE,
      expected: "positive",
      received: value,
    });
  };
}
