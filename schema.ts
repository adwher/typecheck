import { SchemaContext } from "./context.ts";
import { SchemaError } from "./errors.ts";

/**
 * Defines the basic schema to be extended.
 * @example ```ts
 * class MyCustomSchema extends Schema<string> {}
 * ```
 */
// deno-lint-ignore no-explicit-any
export abstract class Schema<T = any> {
  /** Check the given `value` using the strategy of the schema. */
  abstract check(value: unknown, context: SchemaContext): SchemaError | T;
}

/** Defines an record of `keys` and their schemas, useful for objects. */
export interface SchemaShape {
  [key: string | number | symbol]: Schema;
}

/**
 * Allow to infer the exact type of a schema.
 * @example ```
 * const EmailSchema = string(isEmail);
 *
 * type Email = SchemaInfer<typeof EmailSchema>;
 * ```
 */
export type SchemaInfer<T> = T extends Schema<infer U> ? U
  : T extends SchemaShape ? { [K in keyof T]: SchemaInfer<T[K]> }
  : T extends (infer U)[] ? SchemaInfer<U>
  : never;

/**
 * Resctrict the schema definition with a given type.
 * @example```
 * type Email = string;
 *
 * const GoodSchema: SchemaDescribe<Email> = string();
 * // This schema will NOT pass the type checking
 * const BadSchema: SchemaDescribe<Email> = number();
 * ```
 */
export type SchemaDescribe<T> = Schema<T>;
