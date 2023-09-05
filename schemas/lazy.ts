import { SchemaContext } from "../context.ts";
import { SchemaError } from "../errors.ts";
import { Infer, Schema } from "../schema.ts";

/** Generate (lazly) the schema in parsed-time. */
export type SchemaGenerator<S extends Schema> = (
  value: unknown,
  context: SchemaContext,
) => S | SchemaError;

export class SchemaLazy<S extends Schema> extends Schema<Infer<S>> {
  /**
   * Create a new schema that can generate (lazly) the schema in parsed-time.
   * @param getter Generate the right schema on-demand.
   */
  constructor(private getter: SchemaGenerator<S>) {
    super();
  }

  check(value: unknown, context: SchemaContext): SchemaError | Infer<S> {
    const output = this.getter(value, context);

    if (output instanceof SchemaError) {
      return output;
    }

    return output.check(value, context);
  }
}

/**
 * Create a new schema that can generate (lazly) the schema in parsed-time.
 * The language does not like recursive inferences, so you must define the type staticaly in recursive cases.
 * Use `SchemaDescribe` and a defined type to use `recursive` schemas.
 * @returns A new `SchemaLazy` with the type of all possible schemas.
 */
export function lazy<S extends Schema>(getter: SchemaGenerator<S>) {
  return new SchemaLazy(getter);
}

/** Alias of {@link lazy}. */
export const recursive = lazy;
