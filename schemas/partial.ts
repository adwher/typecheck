import { SchemaObject, SchemaShape } from "./object.ts";
import { optional, SchemaOptional } from "./optional.ts";

/** Transform the `S` object's shape into partial. */
export type SchemaShapeOptional<S extends SchemaShape> = {
  [K in keyof S]: SchemaOptional<S[K]>;
};

/**
 * Creates a new `SchemaObject` transforming all the fields into `optionals` of their own type.
 * @example ```ts
 * const UserSchema = object({ firstname: string(), lastname: string() });
 * const CreateUserSchema = partial(UserSchema);
 * ```
 */
export function partial<
  S extends SchemaShape,
  R extends SchemaShape = SchemaShapeOptional<S>,
>(schema: SchemaObject<S>) {
  const shape: SchemaShape = {};

  for (const key of schema.keys) {
    shape[key] = optional(schema.shape[key]);
  }

  return new SchemaObject<S, R>(shape as S);
}
