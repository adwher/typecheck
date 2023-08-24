import { SchemaShape } from "../schema.ts";
import { SchemaObject } from "./object.ts";
import { Override } from "../types.ts";

/**
 * Creates a new `SchemaObject` merging the `initial` schema with the `extensions` fields.
 * Be careful, this also **overrides** the fields in the `initial` schema that has the same key in the `extensions`.
 * @example ```ts
 * const UserSchema = object({ email: string() });
 * const PassportSchema = override(UserSchema, { email: string(isEmail) });
 * ```
 * @example ```ts
 * const UserSchema = object({ email: string() });
 * const PassportSchema = extend(UserSchema, { password: string() });
 * ```
 */
export function override<
  A extends SchemaShape,
  B extends SchemaShape,
  S extends SchemaShape = Override<A, B>,
>(initial: SchemaObject<A>, extension: B) {
  const shape: SchemaShape = { ...initial.shape, ...extension };
  return new SchemaObject(shape as S);
}

/** Alias of {@link override}. */
export const extend = override;
