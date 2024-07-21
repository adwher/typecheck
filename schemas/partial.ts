import { SchemaObject, type SchemaShape } from "./object.ts";
import { optional, type SchemaOptional } from "./optional.ts";

/** Transform the `S` object's shape into partial. */
export type SchemaShapeOptional<S extends SchemaShape> = {
  [K in keyof S]: SchemaOptional<S[K]>;
};

/**
 * Represents a partial schema object.
 * `SchemaObjectPartial` is a type that takes a generic `S` which extends `SchemaShape`,
 * and returns a `SchemaObject` with all properties of `S` being optional.
 */
export type SchemaObjectPartial<S extends SchemaShape> = SchemaObject<
  SchemaShapeOptional<S>
>;

/**
 * Creates a new `SchemaObject` transforming all the fields into `optionals` of their own type.
 */
export function partial<S extends SchemaShape>(
  schema: SchemaObject<S>,
): SchemaObjectPartial<S> {
  const shape: SchemaShape = {};

  for (const key in schema.shape) {
    shape[key] = optional(schema.shape[key]);
  }

  return new SchemaObject(shape as SchemaShapeOptional<S>);
}
