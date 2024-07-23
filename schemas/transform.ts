import type { Context } from "../context.ts";
import { type Check, type Schema, success } from "../schema.ts";

/**
 * Represents a function type that transforms a value of type `G` to a value of type `R`.
 *
 * @template G The input value type.
 * @template R The output value type.
 *
 * @param value The value to be transformed.
 * @param context The context object.
 *
 * @returns The transformed value.
 */
export type SchemaTransformer<G, R> = (value: G, context: Context) => R;

export const SCHEMA_TRANSFORM_NAME = "SCHEMA_TRANSFORM";

/**
 * Represents a schema transformation that applies a transformer function to a value
 * after it has been validated against a schema.
 * @template G The generic type of the input value.
 * @template R The generic type of the transformed value.
 */
export class SchemaTransform<G, R> {
  readonly name = SCHEMA_TRANSFORM_NAME;

  #schema: Schema<G>;
  #transformer: SchemaTransformer<G, R>;

  /**
   * Creates a new instance of the SchemaTransform class.
   * @param schema The schema to validate the input value against.
   * @param transformer The transformer function to apply to the validated value.
   */
  constructor(schema: Schema<G>, transformer: SchemaTransformer<G, R>) {
    this.#schema = schema;
    this.#transformer = transformer;
  }

  check(value: unknown, context: Context): Check<R> {
    const commit = this.#schema.check(value, context);

    if (commit === undefined) {
      return success(this.#transformer(value as G, context));
    }

    if (commit.success === false) {
      return commit;
    }

    return success(this.#transformer(commit.value, context));
  }
}

/**
 * Transforms a `schema` using the provided schema `transformer` function.
 * @param schema The schema to be transformed.
 * @param fn The schema transformer function.
 * @returns A new {@linkcode SchemaTransform} instance representing the transformed schema.
 */
export function transform<G, R>(
  schema: Schema<G>,
  fn: SchemaTransformer<G, R>,
): SchemaTransform<G, R> {
  return new SchemaTransform(schema, fn);
}
