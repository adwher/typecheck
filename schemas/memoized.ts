import { SchemaContext } from "../context.ts";
import { SchemaError } from "../errors.ts";
import { Schema } from "../schema.ts";

export class SchemaMemoized<T> extends Schema<T> {
  private cache: Map<unknown, T | SchemaError>;

  /**
   * Create a new schema that memoize the results of the previous checks.
   * @param schema Original schema.
   */
  constructor(readonly schema: Schema<T>) {
    super();

    this.cache = new Map();
  }

  check(value: unknown, context: SchemaContext): T | SchemaError {
    const cache = this.cache.get(value);

    if (cache) {
      return cache;
    }

    const output = this.schema.check(value, context);
    this.cache.set(value, output);

    return output;
  }

  /** Allow to check the cache with the given key. */
  has(key: unknown) {
    return this.cache.has(key);
  }
}

/**
 * Create a new schema that memoize the results of the previous checks,
 * storing every returned value by the `schema` on check-time to be used next time.
 * @param schema Original schema.
 * @returns Instance of `SchemaMemoized`.
 */
export function memoized<T>(schema: Schema<T>) {
  return new SchemaMemoized(schema);
}
