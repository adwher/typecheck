import { failure } from "../schema.ts";
import type { Pipe } from "../schemas/pipe.ts";

export const VALIDATION_MIN_VALUE = "VALIDATION_MIN_VALUE";

/**
 * Creates a min-value validation step like `value < expected`.
 * If the input does not match the requirement, a failure is returned.
 */
export function minValue(expected: number): Pipe<number>;

/**
 * Creates a min-value validation step like `value < expected`.
 * If the input does not match the requirement, a failure is returned.
 */
export function minValue(expected: Date): Pipe<Date>;

/**
 * Creates a min-value validation step like `value < expected`.
 * With `minValue` you can validate the value of a number or date.
 * If the input does not match the requirement, a failure is returned.
 */
export function minValue(expected: number | Date): Pipe<number> | Pipe<Date> {
  // deno-lint-ignore no-explicit-any
  return function (value: any) {
    if (value > expected) {
      return value;
    }

    return failure({
      reason: "VALIDATION",
      validation: VALIDATION_MIN_VALUE,
      received: value,
      expected,
    });
  };
}
