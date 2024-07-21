import { SchemaObject, type SchemaShape } from "./object.ts";

export type SchemaShapePick<S extends SchemaShape, F extends Array<keyof S>> =
  Pick<S, F[number]>;

export type SchemaObjectPick<S extends SchemaShape, F extends Array<keyof S>> =
  SchemaObject<SchemaShapePick<S, F>>;

/**
 * Creates a new `SchemaObject` picking only the given `fields`.
 */
export function pick<
  S extends SchemaShape,
  F extends Array<keyof S>,
>(
  schema: SchemaObject<S>,
  fields: F,
): SchemaObjectPick<S, F> {
  const shape: SchemaShape = {};

  for (const field of fields) {
    shape[field] = schema.shape[field];
  }

  return new SchemaObject(shape as SchemaShapePick<S, F>);
}
