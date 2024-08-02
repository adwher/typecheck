import type { Context } from "../context.ts";
import type { CheckFrom, Schema, SchemaFrom } from "../schema.ts";

export const SCHEMA_STRICT_NAME = "SCHEMA_STRICT";

/** Defines the context as `strict`. */
export class SchemaStrict<S extends Schema> implements SchemaFrom<S> {
  readonly name = SCHEMA_STRICT_NAME;

  constructor(readonly schema: S) {}

  check(value: unknown, context: Context): CheckFrom<S> {
    context.strict = true;

    return this.schema.check(value, context);
  }
}

/**
 * Applies strict validation to the given schema.
 * @template S - The type of the schema.
 * @param schema The schema to apply strict validation to.
 */
export function strict<S extends Schema>(schema: S): SchemaStrict<S> {
  return new SchemaStrict(schema);
}
