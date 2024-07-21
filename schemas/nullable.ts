import type { Context } from "../context.ts";
import { type Check, type Infer, type Schema, success } from "../schema.ts";

export const SCHEMA_NULLABLE_NAME = "SCHEMA_NULLABLE";

/** @internal Shortcut to the schema inference. */
type ThisInfer<S extends Schema> = Infer<S> | null;

/** @internal Shortcut to the schema extension. */
type ThisFrom<S extends Schema> = Schema<ThisInfer<S>>;

export class SchemaNullable<S extends Schema> implements ThisFrom<S> {
  readonly name = SCHEMA_NULLABLE_NAME;

  /**
   * Creates a new `nullable` schema allowing to have `T` or `null`.
   * @param wrapped Original schema.
   * @param fallback Value returned in case of `null`.
   */
  constructor(
    readonly wrapped: S,
    readonly fallback: ThisInfer<S> = null,
  ) {}

  check(value: unknown, context: Context): Check<ThisInfer<S>> {
    if (value === null) {
      return success(this.fallback);
    }

    return this.wrapped.check(value, context);
  }
}

/**
 * Creates a new `nullable` schema allowing to have `T` or `null`.
 * @param schema Original schema.
 */
export function nullable<S extends Schema>(schema: S): SchemaNullable<S>;

/**
 * Creates a new `nullable` schema allowing to have `T` or use the `fallback`.
 * @param schema Original schema.
 * @param fallback Defaulted value.
 */
export function nullable<S extends Schema>(
  schema: S,
  fallback: Infer<S>,
): SchemaNullable<S>;

/** Creates a new `nullable` schema allowing to have `T` or `null`. */
export function nullable<S extends Schema>(schema: S, fallback?: Infer<S>) {
  return new SchemaNullable<S>(schema, fallback);
}
