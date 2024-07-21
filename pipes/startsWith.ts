import { failure } from "../schema.ts";

export const VALIDATION_STARTS_WITH = "VALIDATION_STARTS_WITH";

/**
 * Check the `value` starts with `search`.
 */
export function startsWith(expected: string) {
  return function (value: string) {
    if (value.startsWith(expected)) {
      return value;
    }

    return failure({
      reason: "VALIDATION",
      validation: VALIDATION_STARTS_WITH,
      expected,
    });
  };
}
