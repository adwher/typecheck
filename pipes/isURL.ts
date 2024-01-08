import { failure } from "../schema.ts";

/**
 * Check the `value` using the `URL` APIs.
 */
export function isURL() {
  return function (value: string) {
    if (URL.canParse(value)) {
      return value;
    }

    return failure({
      reason: "VALIDATION",
      expected: "URL",
      received: value,
    });
  };
}
