import { SchemaObject, SchemaShape } from "./object.ts";
import { Override } from "../types.ts";

type Unwrap<T> = T extends SchemaObject<infer S> ? S : never;

/** Allow to merge an array of `SchemaObject` into a single `SchemaShape`. */
export type SchemaObjectMerge<A> = A extends [infer F] ? Unwrap<F>
  : A extends [infer F, ...infer R] ? Override<Unwrap<F>, SchemaObjectMerge<R>>
  : never;

/**
 * Creates a new `SchemaObject` merging the `initial` schema with the `extension` fields.
 * Be careful, this also **overrides** the fields in the `initial` schema that has the same key in the `extension`.
 */
export function merge<
  S extends SchemaObject,
  E extends SchemaObject[],
>(initial: S, ...extensions: E) {
  type R = SchemaObjectMerge<[S, ...E]>;

  const shape = extensions.reduce(reduce, initial.shape);
  return new SchemaObject(shape as R);
}

function reduce(acc: SchemaShape, curr: SchemaObject): SchemaShape {
  return { ...acc, ...curr.shape };
}
