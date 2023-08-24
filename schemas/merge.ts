import { SchemaShape } from "../schema.ts";
import { SchemaObject } from "./object.ts";
import { Override } from "../types.ts";

type Shape<T> = T extends SchemaShape ? T
  : T extends SchemaObject<infer S> ? S
  : never;

export type SchemaShapeMerge<A> = A extends [infer F] ? Shape<F>
  : A extends [infer F, ...infer R] ? Override<Shape<F>, SchemaShapeMerge<R>>
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
  A extends SchemaShape,
  B extends SchemaObject[],
  S extends SchemaShape = SchemaShapeMerge<[A, ...B]>,
>(initial: SchemaObject<A>, ...extensions: B) {
  const shape = extensions.reduce(reduce, initial.shape);
  return new SchemaObject(shape as S);
}

function reduce(acc: SchemaShape, curr: SchemaObject): SchemaShape {
  return { ...acc, ...curr.shape };
}
