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
>(schema: SchemaObject<S>) {
  type R = SchemaShapeOptional<S>;

  const shape: SchemaShape = {};

  for (const key in schema.shape) {
    shape[key] = optional(schema.shape[key]);
  }

  return new SchemaObject(shape as R);
}
