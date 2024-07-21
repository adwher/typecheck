import { failure } from "../schema.ts";
import type { Pipe } from "../schemas/pipe.ts";

export const VALIDATION_MAX_VALUE = "VALIDATION_MAX_VALUE";

/**
 * Creates a max-value validation step like `value < expected`.
 * If the input does not match the requirement a failure is returned.
 */
export function maxValue(expected: number): Pipe<number>;

/**
 * Creates a max-value validation step like `value < expected`.
 * If the input does not match the requirement a failure is returned.
 */
export function maxValue(expected: Date): Pipe<Date>;

/**
 * Creates a max-value validation step like `value < expected`.
 * With `minValue` you can validate the value of a number or date.
 * If the input does not match the requirement a failure is returned.
 */
export function maxValue(expected: number | Date): Pipe<number> | Pipe<Date> {
  // deno-lint-ignore no-explicit-any
  return function (value: any) {
    if (value < expected) {
      return value;
    }

    return failure({
      reason: "VALIDATION",
      validation: VALIDATION_MAX_VALUE,
      received: value,
      expected,
    });
  };
}
