import { SchemaContext } from "../context.ts";
import { error, SchemaError } from "../errors.ts";
import { Schema } from "../schema.ts";

export type SchemaValidation = (
  value: unknown,
  context: SchemaContext,
) => SchemaError | boolean;

export class SchemaCustom<T> extends Schema<T> {
  /** Create a new `SchemaCustom` that only accepts values that satisfies the `validation`. */
  constructor(private validation: SchemaValidation) {
    super();
  }

  check(value: unknown, context: SchemaContext) {
    const output = this.validation(value, context);

    if (output instanceof SchemaError) {
      return output;
    }

    if (output === true) {
      return value as T;
    }

    return error(context, { message: "Must satisfies the given validation" });
  }
}

/** Create a new `SchemaCustom` that only accepts values that satisfies the `validation`. */
export function custom<T>(validation: SchemaValidation) {
  return new SchemaCustom<T>(validation);
}

/** Alias of {@link custom}. */
export const special = custom;
