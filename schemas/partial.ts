import { SchemaInfer, SchemaShape } from "../schema.ts";
import { SchemaObject } from "./object.ts";
import { optional } from "./optional.ts";

/**
 * Creates a new `SchemaObject` transforming all the fields into `optionals` of their own type.
 * @example ```ts
 * const UserSchema = object({ firstname: string(), lastname: string() });
 * const CreateUserSchema = partial(UserSchema);
 * ```
 */
export function partial<
  S extends SchemaShape,
  R extends object = Partial<SchemaInfer<S>>,
>(schema: SchemaObject<S>) {
  const shape: SchemaShape = {};

  for (const key of schema.keys) {
    shape[key] = optional(schema.shape[key]);
  }

  return new SchemaObject<S, R>(shape as S);
}
