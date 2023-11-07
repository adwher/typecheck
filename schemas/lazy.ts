import { SchemaContext } from "../context.ts";
import { SchemaError } from "../errors.ts";
import { Infer, Schema, SchemaFrom } from "../schema.ts";

/** Generate (lazly) the schema on parsed-time. */
export type SchemaGenerator<S extends Schema> = (
  value: unknown,
  context: SchemaContext,
) => S | SchemaError;

export class SchemaLazy<S extends Schema> extends SchemaFrom<S> {
  /**
   * Create a new schema that can generate (lazly) the schema on parsed-time.
   * @param generate Generate the right schema on-demand.
   */
  constructor(readonly generate: SchemaGenerator<S>) {
    super();
  }

  check(value: unknown, context: SchemaContext): SchemaError | Infer<S> {
    const output = this.generate(value, context);

    if (output instanceof SchemaError) {
      return output;
    }

    return output.check(value, context);
  }
}

/**
 * Create a new schema that can generate (lazly) the schema on parsed-time.
 * The language does not like recursive inferences, so you must define the type staticaly in recursive cases.
 * Use `Describe` and a defined type to use `recursive` schemas.
 * @returns A new `SchemaLazy` with the type of all possible schemas.
 */
export function lazy<S extends Schema>(getter: SchemaGenerator<S>) {
  return new SchemaLazy(getter);
}

/** Alias of {@link lazy}. */
export const recursive = lazy;
