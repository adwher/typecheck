import { SchemaContext } from "../context.ts";
import { Schema } from "../schema.ts";
import { createFallback, Fallback } from "../utils/createFallback.ts";

export class SchemaOptional<T> extends Schema<T | undefined> {
  /**
   * Creates a new `optional` schema allowing to have `T` or `undefined`.
   * @param wrapped Original schema.
   * @param fallback Fallback value or generator.
   */
  constructor(
    readonly wrapped: Schema<T>,
    readonly fallback?: Fallback<T>,
  ) {
    super();
  }

  check(value: unknown, context: SchemaContext) {
    if (value === undefined) {
      return createFallback(this.fallback ?? undefined);
    }

    return this.wrapped.check(value, context);
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
  fallback: Fallback<T>,
): SchemaOptional<T>;

/** Creates a new `optional` schema allowing to have `T` or `undefined`. */
export function optional<T>(schema: Schema<T>, fallback?: Fallback<T>) {
  return new SchemaOptional(schema, fallback);
}
