import { SchemaContext } from "../context.ts";
import { SchemaError } from "../errors.ts";
import { Infer, Schema } from "../schema.ts";

/** Generate (lazly) the schema in parsed-time. */
export type SchemaLazly<S extends Schema> = (
  value: unknown,
  context: SchemaContext,
) => S | SchemaError;

export class SchemaLazy<
  S extends Schema,
  R = Infer<S>,
> extends Schema<R> {
  /**
   * Create a new schema that can generate (lazly) the schema in parsed-time.
   * @param getter Generate the right schema on-demand.
   */
  constructor(private getter: SchemaLazly<S>) {
    super();
  }

  check(value: unknown, context: SchemaContext): SchemaError | R {
    const output = this.getter(value, context);

    if (output instanceof Schema) {
      return output.check(value, context);
    }

    return output;
  }
}

/**
 * Create a new schema that can generate (lazly) the schema in parsed-time.
 * The language does not like recursive inferences, so you must define the type staticaly in recursive cases.
 * Use `SchemaDescribe` and a defined type to use `recursive` schemas.
 * @returns A new `SchemaLazy` with the type of all possible schemas.
 */
export function lazy<S extends Schema>(getter: SchemaLazly<S>) {
  return new SchemaLazy(getter);
}

/** Alias of {@link lazy}. */
export const recursive = lazy;
