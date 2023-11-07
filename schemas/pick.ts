import { SchemaObject, SchemaShape } from "./object.ts";

/** Pick only the given `K` keys in the `S` object's shape. */
export type SchemaShapePick<
  S extends SchemaShape,
  K extends Array<keyof S>,
> = Pick<S, K[number]>;

/**
 * Creates a new `SchemaObject` picking only the selected fields.
 */
export function pick<
  S extends SchemaShape,
  K extends Array<keyof S>,
>(
  schema: SchemaObject<S>,
  keys: K,
) {
  type R = SchemaShapePick<S, K>;

  const shape: SchemaShape = {};

  for (const key of keys) {
    shape[key] = schema.shape[key];
  }

  return new SchemaObject(shape as R);
}
