import { failure } from "../schema.ts";

/**
 * Create a pipe that validates the `length` of the given `value` to be equal to `expected`.
 */
export function length<T extends string | unknown[]>(expected: number) {
  return function (value: T) {
    if (value.length === expected) {
      return value;
    }

    return failure({
      reason: "VALIDATION",
      received: value.length,
      expected,
    });
  };
}
