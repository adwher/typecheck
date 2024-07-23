import type { Context } from "../context.ts";
import type { CheckFrom, Failure, Schema, SchemaFrom } from "../schema.ts";
import { isFailure } from "../utils.ts";

export const SCHEMA_LAZY_NAME = "SCHEMA_LAZY";

/** Generate (lazly) the schema on parse-time. */
export type SchemaGenerator<S extends Schema> = (
  value: unknown,
  context: Context,
) => S | Failure;

/**
 * Create a new schema that can generate (lazly) the schema on parse-time.
 * The language does not like recursive inferences, so you must define the type staticaly in recursive cases.
 * Use `Describe` and a defined type to use `recursive` schemas.
 */
export class SchemaLazy<S extends Schema> implements SchemaFrom<S> {
  readonly name = SCHEMA_LAZY_NAME;

  /**
   * Create a new schema that can generate (lazly) the schema on parse-time.
   * @param generate Generate the right schema on-demand.
   */
  constructor(readonly generate: SchemaGenerator<S>) {}

  check(value: unknown, context: Context): CheckFrom<S> {
    const commit = this.generate(value, context);

    if (isFailure(commit)) {
      return commit;
    }

    return commit.check(value, context);
  }
}

/**
 * Create a new schema that can generate (lazly) the schema on parse-time.
 * The language does not like recursive inferences, so you must define the type staticaly in recursive cases.
 * Use `Describe` and a defined type to use `recursive` schemas.
 * @returns A new `SchemaLazy` with the type of all possible schemas.
 */
export function lazy<S extends Schema>(
  getter: SchemaGenerator<S>,
): SchemaLazy<S> {
  return new SchemaLazy(getter);
}
