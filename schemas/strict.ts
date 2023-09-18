import { SchemaContext } from "../context.ts";
import { Schema } from "../schema.ts";

export class SchemaStrict<R> extends Schema<R> {
  /**
   * Create a stricted schema that wraps the original one.
   * @param schema Wrapped schema.
   */
  constructor(readonly schema: Schema<R>) {
    super();
  }

  check(value: unknown, context: SchemaContext) {
    return this.schema.check(value, { ...context, strict: true });
  }
}

export function strict<S extends Schema>(schema: S): S;

/**
 * Create a stricted schema that wraps the original one.
 * @param schema Wrapped schema.
 */
export function strict<S extends Schema>(schema: S) {
  return new SchemaStrict(schema);
}
