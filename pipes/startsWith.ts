import { failure } from "../schema.ts";

/**
 * Check the `value` starts with `search`.
 */
export function startsWith(expected: string) {
  return function (value: string) {
    if (value.startsWith(expected)) {
      return value;
    }

    return failure({ reason: "VALIDATION", expected });
  };
}
