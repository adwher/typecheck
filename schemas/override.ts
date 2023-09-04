import { SchemaObject, SchemaShape } from "./object.ts";
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
  S extends SchemaShape,
  E extends SchemaShape,
>(initial: SchemaObject<S>, extension: E) {
  type R = Override<S, E>;

  return new SchemaObject<R>({
    ...initial.shape,
    ...extension,
  });
}

/** Alias of {@link override}. */
export const extend = override;
