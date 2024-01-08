import { Check, failure, Schema } from "../schema.ts";

export const SCHEMA_ENUMERATED_NAME = "SCHEMA_ENUMERATED";

/** Allowed types as enumerables. */
export type Enumerable = string | number | boolean;

const ISSUE_VALIDATION = failure({ reason: "VALIDATION" });

export class SchemaEnumerated<
  T extends readonly Enumerable[],
> implements Schema<T[number]> {
  readonly name = SCHEMA_ENUMERATED_NAME;

  /**
   * Creates a new enumerated schema that only receives the given `options`.
   * @param allowed Allowed values of the schema.
   */
  constructor(private allowed: T) {}

  check(value: unknown): Check<T[number]> {
    const isEnumerated = this.canUse(value);

    if (isEnumerated === false) {
      return ISSUE_VALIDATION;
    }

    return undefined;
  }

  /** Checks `value` is allowed in the `options`. */
  canUse(value: unknown) {
    return isEnumerable(value) && this.allowed.includes(value);
  }
}

/**
 * Creates a new enumerated schema that only receives the given `options`.
 */
export function enumerated<E extends readonly Enumerable[]>(...options: E) {
  return new SchemaEnumerated<E>(options);
}

/** Alias of {@link enumerated}. */
export const options = enumerated;

/** Check one `value` as `Enumerable`. */
export function isEnumerable(value: unknown): value is Enumerable {
  return typeof value === "string" || typeof value === "number";
}
