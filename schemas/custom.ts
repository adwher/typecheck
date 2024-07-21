import type { Context } from "../context.ts";
import { type Check, type Failure, failure, type Schema } from "../schema.ts";
import { isFailure } from "../utils/mod.ts";

/** Function that validates the satisfaction of the given `value` as the given schema. */
export type SchemaValidation = (
  value: unknown,
  context: Context,
) => boolean | Failure;

export const SCHEMA_CUSTOM_NAME = "SCHEMA_CUSTOM";

const ISSUE_VALIDATION = failure({ reason: "VALIDATION" });

export class SchemaCustom<T> implements Schema<T> {
  readonly name = SCHEMA_CUSTOM_NAME;

  /**
   * Create a new `SchemaCustom` that only accepts values that satisfies the `validation`.
   * @param canParse Checks the given `value` is allowed as `T`.
   */
  constructor(readonly canParse: SchemaValidation) {}

  check(value: unknown, context: Context): Check<T> {
    const output = this.canParse(value, context);

    if (output === true) {
      return undefined;
    }

    if (isFailure(output)) {
      return output;
    }

    return ISSUE_VALIDATION;
  }
}

/**
 * Create a new `SchemaCustom` that only accepts values that satisfies the `validation`.
 * @param validation Checks the given `value`.
 */
export function custom<T>(validation: SchemaValidation): SchemaCustom<T> {
  return new SchemaCustom<T>(validation);
}
