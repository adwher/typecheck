import { SchemaShape } from "../schema.ts";
import { SchemaObject } from "./object.ts";

/** Pick only the given `K` keys in the `S` object's shape. */
export type SchemaShapePick<
  S extends SchemaShape,
  K extends Array<keyof S>,
> = Pick<S, K[number]>;

/**
 * Creates a new `SchemaObject` picking only the selected fields.
 * @example ```ts
 * const UserSchema = object({ firstname: string(), lastname: string() });
 * const CreateUserSchema = pick(UserSchema, ["firstname"]);
 * ```
 */
export function pick<
  S extends SchemaShape,
  K extends Array<keyof S>,
  R extends SchemaShape = SchemaShapePick<S, K>,
>(
  schema: SchemaObject<S>,
  keys: K,
) {
  const shape: SchemaShape = {};

  for (const key of keys) {
    shape[key] = schema.shape[key];
  }

  return new SchemaObject(shape as R);
}
