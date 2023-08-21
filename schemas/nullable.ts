import { SchemaContext } from "../context.ts";
import { Schema } from "../schema.ts";

export class SchemaNullable<T> extends Schema<T | null> {
  /**
   * Creates a new `nullable` schema allowing to have `T` or `null`.
   * @param schema Original schema.
   */
  constructor(private schema: Schema<T>) {
    super();
  }

  check(value: unknown, context: SchemaContext) {
    if (value === null) {
      return value;
    }

    return this.schema.check(value, context);
  }
}

/** Creates a new `nullable` schema allowing to have `T` or `null`. */
export function nullable<T>(schema: Schema<T>) {
  return new SchemaNullable(schema);
}
