import { SchemaShape } from "../schema.ts";
import { SchemaObject } from "./object.ts";

/** Omit the given `K` keys in the `S` object's shape. */
export type SchemaShapeOmit<
  S extends SchemaShape,
  K extends Array<keyof S>,
> = Omit<S, K[number]>;

/**
 * Creates a new `SchemaObject` skipping the selected fields.
 * @example ```ts
 * const UserSchema = object({ firstname: string(), lastname: string() });
 * const CreateUserSchema = omit(UserSchema, ["lastname"]);
 * ```
 */
export function omit<
  S extends SchemaShape,
  K extends Array<keyof S>,
  R extends SchemaShape = SchemaShapeOmit<S, K>,
>(
  schema: SchemaObject<S>,
  keys: K,
) {
  const shape: SchemaShape = {};

  for (const key of schema.keys) {
    if (keys.includes(key)) {
      continue;
    }

    shape[key] = schema.shape[key];
  }

  return new SchemaObject(shape as R);
}
