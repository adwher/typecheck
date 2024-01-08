import { failure } from "../schema.ts";

/**
 * Check the `value` as a integer number using the `Number.isInteger` function.
 */
export function isInteger() {
  return function (value: number) {
    if (Number.isInteger(value)) {
      return value;
    }

    return failure({
      reason: "VALIDATION",
      expected: "integer",
      received: value,
    });
  };
}
