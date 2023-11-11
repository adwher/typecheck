import { SchemaContext } from "../context.ts";
import { Schema } from "../schema.ts";
import { createFallback, Fallback } from "../utils/createFallback.ts";

export class SchemaNullable<T> extends Schema<T | null> {
  /**
   * Creates a new `nullable` schema allowing to have `T` or `null`.
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
    if (value === null) {
      return createFallback(this.fallback ?? null);
    }

    return this.wrapped.check(value, context);
  }
}

/**
 * Creates a new `nullable` schema allowing to have `T` or `null`.
 * @param schema Original schema.
 */
export function nullable<T>(schema: Schema<T>): SchemaNullable<T>;

/**
 * Creates a new `nullable` schema allowing to have `T` or use the `fallback`.
 * @param schema Original schema.
 * @param fallback Defaulted value.
 */
export function nullable<T>(
  schema: Schema<T>,
  fallback: Fallback<T>,
): SchemaNullable<T>;

/** Creates a new `nullable` schema allowing to have `T` or `null`. */
export function nullable<T>(schema: Schema<T>, fallback?: Fallback<T>) {
  return new SchemaNullable(schema, fallback);
}
