import { failure } from "../schema.ts";

/**
 * Check the `value` as a negative number.
 */
export function isNegative() {
  return function (value: number) {
    if (value < 0) {
      return value;
    }

    return failure({
      reason: "VALIDATION",
      expected: "negative",
      received: value,
    });
  };
}
