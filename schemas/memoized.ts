import { SchemaContext } from "../context.ts";
import { SchemaError } from "../errors.ts";
import { Infer, Schema } from "../schema.ts";

interface Options {
  /**
   * Generates a `key` for the given `value`, used to check the cache.
   * By default, we use `JSON.stringify` as serializer.
   * @param value Given value in the parsing process.
   */
  serialize?(value: unknown): string;
}

export class SchemaMemoized<S extends Schema> extends Schema<Infer<S>> {
  private cache: Map<unknown, Infer<S> | SchemaError>;

  /**
   * Create a new schema that memoize the results of the previous checks.
   * @param schema Original schema.
   */
  constructor(readonly schema: S, private options: Options) {
    super();

    this.cache = new Map();
  }

  /** Use the given `serializer` to generate a unique key for the given `value`. */
  private serialize(value: unknown) {
    return this.options.serialize?.(value) ?? JSON.stringify(value);
  }

  check(value: unknown, context: SchemaContext): Infer<S> | SchemaError {
    const key = this.serialize(value);
    const cache = this.cache.get(key);

    if (cache) {
      return cache;
    }

    const output = this.schema.check(value, context);
    this.cache.set(key, output);

    return output;
  }

  /** Allow to check the cache with the given key. */
  has(value: unknown) {
    const key = this.serialize(value);
    return this.cache.has(key);
  }

  /** Clear the cache. */
  clear() {
    this.cache.clear();
  }
}

/**
 * Create a new schema that memoize the results of the previous checks,
 * storing every returned value by the `schema` on parse-time to be used next time.
 * @param schema Original schema.
 * @returns Instance of `SchemaMemoized`.
 */
export function memoized<S extends Schema>(schema: S, options?: Options) {
  const fallback: Options = { ...options };
  return new SchemaMemoized(schema, fallback);
}
