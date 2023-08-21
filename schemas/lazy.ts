import { SchemaContext } from "../context.ts";
import { SchemaError } from "../errors.ts";
import { Schema, SchemaInfer } from "../schema.ts";

/** Generate (lazly) the schema in parsed-time. */
export type SchemaGenerator<R, I = unknown> = (
  value: I,
  context: SchemaContext,
) => SchemaError | R;

export class SchemaLazy<
  S extends Schema,
  R = SchemaInfer<S>,
> extends Schema<R> {
  /**
   * Create a new schema that can generate (lazly) the schema in parsed-time.
   * @param action Generate the right schema on-demand.
   */
  constructor(private action: SchemaGenerator<S>) {
    super();
  }

  check(value: unknown, context: SchemaContext): SchemaError | R {
    const output = this.action(value, context);

    if (output instanceof Schema) {
      return output.check(value, context);
    }

    return output;
  }
}

/**
 * Create a new schema that can generate (lazly) the schema in parsed-time.
 * @param action Generate the right schema on-demand.
 * @returns A new `SchemaLazy` with the type of all possible schemas.
 */
export function lazy<S extends Schema>(action: SchemaGenerator<S>) {
  return new SchemaLazy<S>(action);
}
