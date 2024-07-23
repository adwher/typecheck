import { SchemaObject, type SchemaShape } from "./object.ts";
import type { Override } from "../types.ts";

/**
 * Merges two schemas shapes.
 */
export type SchemaShapeOverride<S extends SchemaShape, E extends SchemaShape> =
  Override<S, E>;

/**
 * Merges two {@linkcode SchemaObject} schemas.
 */
export type SchemaObjectOverride<S extends SchemaShape, E extends SchemaShape> =
  SchemaObject<SchemaShapeOverride<S, E>>;

/**
 * Creates a new `SchemaObject` merging the `initial` schema with the `extension` fields.
 * Be careful, this also **overrides** the fields in the `initial` schema that has the same key in the `extension`.
 */
export function override<
  S extends SchemaShape,
  E extends SchemaShape,
>(
  initial: SchemaObject<S>,
  extension: E,
): SchemaObjectOverride<S, E> {
  return new SchemaObject({ ...initial.shape, ...extension });
}
