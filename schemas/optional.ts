import type { Context } from "../context.ts";
import { type Check, type Infer, type Schema, success } from "../schema.ts";

export const SCHEMA_OPTIONAL_NAME = "SCHEMA_OPTIONAL";

/** @internal Shortcut to the schema inference. */
type ThisInfer<S extends Schema> = Infer<S> | undefined;

/** @internal Shortcut to the schema extension. */
type ThisFrom<S extends Schema> = Schema<ThisInfer<S>>;

/**
 * Creates a new `optional` schema allowing to have `T` or `undefined`.
 */
export class SchemaOptional<S extends Schema> implements ThisFrom<S> {
  readonly name = SCHEMA_OPTIONAL_NAME;

  /**
   * Creates a new `optional` schema allowing to have `T` or `undefined`.
   * @param wrapped Original schema.
   * @param fallback Value returned in case of `undefined`.
   */
  constructor(
    readonly wrapped: S,
    readonly fallback: ThisInfer<S> = undefined,
  ) {}

  check(value: unknown, context: Context): Check<ThisInfer<S>> {
    if (value === undefined) {
      return success(this.fallback);
    }

    return this.wrapped.check(value, context);
  }
}

/**
 * Creates a new `optional` schema allowing to have `T` or `undefined`.
 * @param schema Original schema.
 */
export function optional<S extends Schema>(schema: S): SchemaOptional<S>;

/**
 * Creates a new `optional` schema allowing to have `T` or use the `fallback`.
 * @param schema Original schema.
 * @param fallback Defaulted value.
 */
export function optional<S extends Schema>(
  schema: S,
  fallback: Infer<S>,
): S;

export function optional<S extends Schema>(schema: S, fallback?: Infer<S>) {
  return new SchemaOptional(schema, fallback);
}
