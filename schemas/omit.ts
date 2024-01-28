import { SchemaObject, SchemaShape } from "./object.ts";

/**
 * Creates a new `SchemaObject` skipping the given `fields`.
 */
export function omit<
  S extends SchemaShape,
  F extends Array<keyof S>,
>(
  schema: SchemaObject<S>,
  fields: F,
) {
  type R = Omit<S, F[number]>;
  const shape: SchemaShape = { ...schema.shape };

  for (const field of fields) {
    delete shape[field];
  }

  return new SchemaObject(shape as R);
}
