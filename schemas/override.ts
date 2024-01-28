import { SchemaObject, SchemaShape } from "./object.ts";
import { Override } from "../types.ts";

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
) {
  const shape: Override<S, E> = { ...initial.shape, ...extension };
  return new SchemaObject(shape);
}
