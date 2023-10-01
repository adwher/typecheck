import { SchemaContext } from "../context.ts";
import { Infer, Schema } from "../schema.ts";
import { isFn } from "../types.ts";

/** Sets or generate a defaulted value for the given `schema`. */
export type SchemaFallback<T> = { (): T } | T;

export class SchemaOptional<T> extends Schema<T | undefined> {
  /**
   * Creates a new `optional` schema allowing to have `T` or `undefined`.
   * @param schema Original schema.
   * @param defaulted Defaulted value.
   */
  constructor(
    readonly schema: Schema<T>,
    private defaulted?: SchemaFallback<T>,
  ) {
    super();
  }

  check(value: unknown, context: SchemaContext) {
    if (value === undefined) {
      return this.fallback;
    }

    return this.schema.check(value, context);
  }

  /** Gets the fallback value for the schema. */
  get fallback() {
    return isFn(this.defaulted) ? this.defaulted() : this.defaulted;
  }
}

/**
 * Creates a new `optional` schema allowing to have `T` or `undefined`.
 * @param schema Original schema.
 */
export function optional<T>(schema: Schema<T>): SchemaOptional<T>;

/**
 * Creates a new `optional` schema allowing to have `T` or use the `fallback`.
 * @param schema Original schema.
 * @param fallback Defaulted value.
 */
export function optional<T>(
  schema: Schema<T>,
  fallback: SchemaFallback<Infer<T>>,
): SchemaOptional<T>;

/** Creates a new `optional` schema allowing to have `T` or `undefined`. */
export function optional<T>(schema: Schema<T>, fallback?: SchemaFallback<T>) {
  return new SchemaOptional(schema, fallback);
}
