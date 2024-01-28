import { failure } from "../schema.ts";

/**
 * Create a pipe that validates the `value`.
 */
export function minValue(expected: number) {
  return function (value: number) {
    if (value > expected) {
      return value;
    }

    return failure({
      reason: "VALIDATION",
      received: value,
      expected,
    });
  };
}
