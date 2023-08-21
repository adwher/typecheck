import { SchemaContext } from "../context.ts";
import { Schema, SchemaInfer } from "../schema.ts";
import { isFn } from "../types.ts";

type Fallback<T> = { (): T } | T;

export class SchemaOptional<T> extends Schema<T | undefined> {
  /**
   * Creates a new `optional` schema allowing to have `T` or `undefined`.
   * @param schema Original schema.
   * @param fallback Defaulted value.
   */
  constructor(
    private schema: Schema<T>,
    private fallback?: Fallback<T>,
  ) {
    super();
  }

  check(value: unknown, context: SchemaContext) {
    if (value === undefined) {
      return isFn(this.fallback) ? this.fallback() : this.fallback;
    }

    return this.schema.check(value, context);
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
export function optional<S extends Schema>(
  schema: S,
  fallback: Fallback<SchemaInfer<S>>,
): S;

/** Creates a new `optional` schema allowing to have `T` or `undefined`. */
export function optional<T>(schema: Schema<T>, fallback?: Fallback<T>) {
  return new SchemaOptional(schema, fallback);
}
