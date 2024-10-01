import type { Schema } from "../schema.ts";
import { instanceOf } from "../types.ts";
import {
  type SchemaInferShape,
  type SchemaKeys,
  SchemaObject,
  type SchemaShape,
} from "../schemas.ts";

/**
 * Omit the given fields from the `SchemaShape`.
 */
export type SchemaShapeOmit<S extends SchemaShape, F extends Array<keyof S>> =
  Omit<S, F[number]>;

/**
 * Creates a new `SchemaObject` skipping the given `fields`.
 */
export type SchemaObjectOmit<S extends Schema, F extends SchemaKeys<S>[]> =
  SchemaObject<SchemaShapeOmit<SchemaInferShape<S>, F>>;

/**
 * Creates a new `SchemaObject` skipping the given `fields`.
 * @throws When the given `schema` is not an instance of `SchemaObject`.
 */
export function omit<
  T extends object,
  S extends Schema<T>,
  F extends SchemaKeys<S>[],
>(
  schema: S,
  fields: F,
): SchemaObjectOmit<S, F> {
  if (!instanceOf(schema, SchemaObject)) {
    throw new Error("Schema must be an instance of `SchemaObject`.");
  }

  const shape: SchemaShape = { ...schema.shape };

  for (const field of fields) {
    delete shape[field];
  }

  return new SchemaObject(shape as SchemaShapeOmit<typeof schema.shape, F>);
}
