import { failure } from "../schema.ts";

/**
 * Check the `value` as a positive number.
 */
export function isPositive() {
  return function (value: number) {
    if (value >= 0) {
      return value;
    }

    return failure({
      reason: "VALIDATION",
      expected: "positive",
      received: value,
    });
  };
}
