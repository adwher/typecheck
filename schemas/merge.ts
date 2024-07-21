import { SchemaObject, type SchemaShape } from "./object.ts";
import type { Override } from "../types.ts";

export type SchemaShapeMerge<S extends SchemaShape, E extends SchemaShape> =
  Override<S, E>;

export type SchemaObjectMerge<S extends SchemaShape, E extends SchemaShape> =
  SchemaObject<SchemaShapeMerge<S, E>>;

/**
 * Creates a new `SchemaObject` merging the `initial` schema with the `extension` fields.
 * Be careful, this also **overrides** the fields in the `initial` schema that has the same key in the `extension`.
 */
export function merge<
  S extends SchemaShape,
  E extends SchemaShape,
>(
  initial: SchemaObject<S>,
  extension: SchemaObject<E>,
): SchemaObjectMerge<S, E> {
  return new SchemaObject({ ...initial.shape, ...extension.shape });
}
