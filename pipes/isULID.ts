import { failure } from "../schema.ts";
import type { Pipe } from "../schemas/pipe.ts";

export const VALIDATION_ULID = "VALIDATION_ULID";

const ULID_REGEX = /^[0-7][0-9A-HJKMNP-TV-Z]{25}$/;

/**
 * Checks if the value is a valid ULID string.
 * @example
 * ```ts
 * const schema = pipe(string(), isULID());
 * ```
 */
export function isULID(): Pipe<string> {
  return function (value: string) {
    if (ULID_REGEX.test(value)) {
      return value;
    }

    return failure({
      reason: "VALIDATION",
      validation: VALIDATION_ULID,
      received: value,
    });
  };
}
