import { failure } from "../schema.ts";

/**
 * Create a pipe that validates the `length` of the given `value`.
 */
export function maxLength<T extends string | unknown[]>(expected: number) {
  return function (value: T) {
    if (value.length < expected) {
      return value;
    }

    return failure({
      reason: "VALIDATION",
      received: value.length,
      expected,
    });
  };
}
