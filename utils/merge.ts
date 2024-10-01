import type { Schema } from "../schema.ts";
import { instanceOf, type Override } from "../types.ts";
import {
  type SchemaInferShape,
  SchemaObject,
  type SchemaShape,
} from "../schemas.ts";

/**
 * Merges two schemas shapes.
 */
export type SchemaShapeMerge<S extends SchemaShape, E extends SchemaShape> =
  Override<S, E>;

/**
 * Merges two {@linkcode SchemaObject} schemas.
 */
export type SchemaObjectMerge<S extends Schema, E extends Schema> =
  SchemaObject<SchemaShapeMerge<SchemaInferShape<S>, SchemaInferShape<E>>>;

/**
 * Creates a new `SchemaObject` merging the `initial` schema with the `extension` fields.
 * Be careful, this also **overrides** the fields in the `initial` schema that has the same key in the `extension`.
 * @throws When the given `schema` is not an instance of `SchemaObject`.
 */
export function merge<
  A extends object,
  S extends Schema<A>,
  B extends object,
  E extends Schema<B>,
>(
  initial: S,
  extension: E,
): SchemaObjectMerge<S, E> {
  if (!instanceOf(initial, SchemaObject)) {
    throw new Error("Schema `initial` must be `SchemaObject`.");
  }

  if (!instanceOf(extension, SchemaObject)) {
    throw new Error("Schema `extension` must be `SchemaObject`.");
  }

  return new SchemaObject({ ...initial.shape, ...extension.shape });
}
