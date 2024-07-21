import { failure } from "../schema.ts";
import type { Pipe } from "../schemas/pipe.ts";

export const VALIDATION_INTEGER = "VALIDATION_INTEGER";

/**
 * Check the `value` as a integer number using the `Number.isInteger` function.
 */
export function isInteger(): Pipe<number> {
  return function (value: number) {
    if (Number.isInteger(value)) {
      return value;
    }

    return failure({
      reason: "VALIDATION",
      validation: VALIDATION_INTEGER,
      expected: VALIDATION_INTEGER,
      received: value,
    });
  };
}
