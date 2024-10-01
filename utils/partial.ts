import type { Schema } from "../schema.ts";
import { instanceOf } from "../types.ts";
import {
  optional,
  type SchemaInferShape,
  SchemaObject,
  type SchemaOptional,
  type SchemaShape,
} from "../schemas.ts";

/** Transform the `S` object's shape into partial. */
export type SchemaShapePartial<S extends SchemaShape> = {
  [K in keyof S]: SchemaOptional<S[K]>;
};

/**
 * Represents a partial schema object.
 * `SchemaObjectPartial` is a type that takes a generic `S` which extends `SchemaShape`,
 * and returns a `SchemaObject` with all properties of `S` being optional.
 */
export type SchemaObjectPartial<S extends Schema> = SchemaObject<
  SchemaShapePartial<SchemaInferShape<S>>
>;

/**
 * Creates a new `SchemaObject` transforming all the fields into `optionals` of their own type.
 * @throws When the given `schema` is not an instance of `SchemaObject`.
 */
export function partial<T extends object, S extends Schema<T>>(
  schema: S,
): SchemaObjectPartial<S> {
  if (!instanceOf(schema, SchemaObject)) {
    throw new Error("Schema must be an instance of `SchemaObject`.");
  }

  const shape: SchemaShape = {};

  for (const key in schema.shape) {
    shape[key] = optional(schema.shape[key]);
  }

  return new SchemaObject(shape as SchemaShapePartial<typeof schema.shape>);
}
