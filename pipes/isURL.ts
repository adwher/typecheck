import { failure } from "../schema.ts";
import type { Pipe } from "../schemas/pipe.ts";

export const VALIDATION_URL = "VALIDATION_URL";

/**
 * Check the `value` using the `URL` APIs.
 */
export function isURL(): Pipe<string> {
  return function (value: string) {
    if (URL.canParse(value)) {
      return value;
    }

    return failure({
      reason: "VALIDATION",
      validation: VALIDATION_URL,
      received: value,
    });
  };
}
