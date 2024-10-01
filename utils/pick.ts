import type { Schema } from "../schema.ts";
import { instanceOf } from "../types.ts";
import {
  type SchemaInferShape,
  type SchemaKeys,
  SchemaObject,
  type SchemaShape,
} from "../schemas/object.ts";

/**
 * Pick the given fields from the `SchemaShape`.
 */
export type SchemaShapePick<S extends SchemaShape, F extends Array<keyof S>> =
  Pick<S, F[number]>;

/**
 * Creates a new `SchemaObject` picking only the given `fields`.
 */
export type SchemaObjectPick<S extends Schema, F extends SchemaKeys<S>[]> =
  SchemaObject<SchemaShapePick<SchemaInferShape<S>, F>>;

/**
 * Creates a new `SchemaObject` picking only the given `fields`.
 * @throws When the given `schema` is not an instance of `SchemaObject`.
 */
export function pick<
  T extends object,
  S extends Schema<T>,
  F extends SchemaKeys<S>[],
>(
  schema: S,
  fields: F,
): SchemaObjectPick<S, F> {
  if (!instanceOf(schema, SchemaObject)) {
    throw new Error("Schema must be an instance of `SchemaObject`.");
  }

  const shape: SchemaShape = {};

  for (const field of fields) {
    shape[field] = schema.shape[field];
  }

  return new SchemaObject(shape as SchemaShapePick<typeof schema.shape, F>);
}
