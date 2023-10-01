import { SchemaContext } from "../context.ts";
import { error, SchemaError } from "../errors.ts";
import { Schema } from "../schema.ts";
import { isNum, isStr } from "../types.ts";

/** Allowed types as enumerables. */
export type Enumerable = string | number | boolean;

export class SchemaEnumerated<
  T extends readonly Enumerable[],
> extends Schema<T[number]> {
  /** Allowed values of the schema. */
  private options: Set<T[number]>;

  /**
   * Creates a new enumerated schema that only receives the given `options`.
   * @param options Allowed values of the schema.
   */
  constructor(options: T) {
    super();

    this.options = new Set(options);
  }

  check(value: unknown, context: SchemaContext): T[number] | SchemaError {
    const isEnumerable = isStr(value) || isNum(value);

    if (!isEnumerable || !this.canUse(value)) {
      const message = `Must be one of the given options, got "${value}"`;
      return error(context, { message });
    }

    return value;
  }

  /** Checks `value` is allowed in the `options`. */
  canUse(value: Enumerable) {
    return this.options.has(value);
  }
}

/**
 * Creates a new enumerated schema that only receives the given `options`.
 * @example ```ts
 * const RoleSchema = enumerated("Student", "Teacher", "Administrator");
 * ```
 */
export function enumerated<E extends readonly Enumerable[]>(...options: E) {
  return new SchemaEnumerated<E>(options);
}

/** Alias of {@link enumerated}. */
export const options = enumerated;
