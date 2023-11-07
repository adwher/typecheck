import { SchemaContext } from "./context.ts";
import { SchemaError } from "./errors.ts";

/**
 * Defines the basic schema to be extended.
 * This type can be used to restrict the schema definition with a given type.
 */
// deno-lint-ignore no-explicit-any
export abstract class Schema<T = any> {
  /** Check the given `value` using the strategy of the schema. */
  abstract check(value: unknown, context: SchemaContext): SchemaError | T;
}

/** Alias for `Schema<Infer<T>>`. */
export abstract class SchemaFrom<T> extends Schema<Infer<T>> {}

/**
 * Allow to infer the exact type of a schema.
 */
export type Infer<T> = T extends Schema<infer U> ? U
  : T extends object ? { [K in keyof T]: Infer<T[K]> }
  : T extends (infer U)[] ? Infer<U>
  : never;

/**
 * Resctrict the schema definition with a given type.
 */
export type Describe<T> = Schema<T>;
