import { SchemaContext } from "../context.ts";
import { error, SchemaError } from "../errors.ts";
import { Schema } from "../schema.ts";
import { isNum, isStr } from "../types.ts";

type Enumerable = string | number;

export class SchemaEnumerated<
  A extends readonly Enumerable[],
> extends Schema<A[number]> {
  /** Allowed values of the schema. */
  readonly options: Set<Enumerable>;

  /**
   * Creates a new enumerated schema that only receives the given `options`.
   * @param options Allowed values of the schema.
   */
  constructor(options: A) {
    super();

    this.options = new Set(options);
  }

  check(value: unknown, context: SchemaContext): A[number] | SchemaError {
    const isEnumerable = isStr(value) || isNum(value);

    if (!isEnumerable) {
      return error(context, {
        message: `Must be either "string" or "number", got ${typeof value}`,
      });
    }

    if (!this.has(value)) {
      return error(context, {
        message: `Must be one of the given options, got "${value}"`,
      });
    }

    return value;
  }

  /** Validate `value` exists in `options`. */
  has(value: Enumerable) {
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
