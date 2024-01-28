import { SchemaObject, SchemaShape } from "./object.ts";

/**
 * Creates a new `SchemaObject` picking only the given `fields`.
 */
export function pick<
  S extends SchemaShape,
  F extends Array<keyof S>,
>(
  schema: SchemaObject<S>,
  fields: F,
) {
  type R = Pick<S, F[number]>;
  const shape: SchemaShape = {};

  for (const field of fields) {
    shape[field] = schema.shape[field];
  }

  return new SchemaObject(shape as R);
}
