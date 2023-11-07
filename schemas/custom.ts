import { SchemaContext } from "../context.ts";
import { createError, SchemaError } from "../errors.ts";
import { Schema } from "../schema.ts";

/** Function that validates the satisfaction of the given `value` as the given schema. */
export type SchemaValidation = (
  value: unknown,
  context: SchemaContext,
) => SchemaError | boolean;

export class SchemaCustom<T> extends Schema<T> {
  /**
   * Create a new `SchemaCustom` that only accepts values that satisfies the `validation`.
   * @param canParse Checks the given `value` is allowed as `T`.
   */
  constructor(readonly canParse: SchemaValidation) {
    super();
  }

  check(value: unknown, context: SchemaContext) {
    const output = this.canParse(value, context);

    if (output instanceof SchemaError) {
      return output;
    }

    if (output === true) {
      return value as T;
    }

    return createError(context, {
      message: "Must satisfies the given validation",
    });
  }
}

/**
 * Create a new `SchemaCustom` that only accepts values that satisfies the `validation`.
 * @param validation Checks the given `value`.
 */
export function custom<T>(validation: SchemaValidation) {
  return new SchemaCustom<T>(validation);
}

/** Alias of {@link custom}. */
export const special = custom;
