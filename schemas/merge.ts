import { SchemaObject, SchemaShape } from "./object.ts";
import { Override } from "../types.ts";

type Unwrap<T> = T extends SchemaShape ? T
  : T extends SchemaObject<infer S> ? S
  : never;

export type SchemaShapeMerge<A> = A extends [infer F] ? Unwrap<F>
  : A extends [infer F, ...infer R] ? Override<Unwrap<F>, SchemaShapeMerge<R>>
  : never;

/**
 * Creates a new `SchemaObject` merging the `initial` schema with the `extension` fields.
 * Be careful, this also **overrides** the fields in the `initial` schema that has the same key in the `extension`.
 * @example ```ts
 * const UserSchema = object({ email: string() });
 * const PassportSchema = object({ password: string() });
 *
 * const CreateUserSchema = merge(UserSchema, PassportSchema);
 * ```
 */
export function merge<
  S extends SchemaObject,
  E extends SchemaObject[],
>(initial: S, ...extensions: E) {
  type R = SchemaShapeMerge<[S, ...E]>;

  const shape = extensions.reduce(reduce, initial.shape);
  return new SchemaObject(shape as R);
}

function reduce(acc: SchemaShape, curr: SchemaObject): SchemaShape {
  return { ...acc, ...curr.shape };
}
