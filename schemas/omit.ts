import { SchemaObject, type SchemaShape } from "./object.ts";

/**
 * Omit the given fields from the `SchemaShape`.
 */
export type SchemaShapeOmit<S extends SchemaShape, F extends Array<keyof S>> =
  Omit<S, F[number]>;

/**
 * Creates a new `SchemaObject` skipping the given `fields`.
 */
export type SchemaObjectOmit<S extends SchemaShape, F extends Array<keyof S>> =
  SchemaObject<SchemaShapeOmit<S, F>>;

/**
 * Creates a new `SchemaObject` skipping the given `fields`.
 */
export function omit<
  S extends SchemaShape,
  F extends Array<keyof S>,
>(
  schema: SchemaObject<S>,
  fields: F,
): SchemaObjectOmit<S, F> {
  const shape: SchemaShape = { ...schema.shape };

  for (const field of fields) {
    delete shape[field];
  }

  return new SchemaObject(shape as SchemaShapeOmit<S, F>);
}
