import type { Context } from "../context.ts";
import { type Check, failure, type Schema } from "../schema.ts";

export const SCHEMA_ENUMERATED_NAME = "SCHEMA_ENUMERATED";

const ISSUE_VALIDATION = failure({ reason: "VALIDATION" });

/** Allowed types as enumerables. */
export type Enumerable = string | number | boolean;

/**
 * Creates a new enumerated schema that only receives the given `options`.
 */
export class SchemaEnumerated<
  T extends readonly Enumerable[],
> implements Schema<T[number]> {
  readonly name = SCHEMA_ENUMERATED_NAME;
  /** Allowed values of the schema. */
  #allowed: T;

  /**
   * Creates a new enumerated schema that only receives the given `options`.
   * @param allowed Allowed values of the schema.
   */
  constructor(allowed: T) {
    this.#allowed = allowed;
  }

  check(value: unknown, context: Context): Check<T[number]> {
    const isEnumerated = this.canUse(value);

    if (isEnumerated) {
      return undefined;
    }

    if (context.verbose === false) {
      return ISSUE_VALIDATION;
    }

    return failure({ reason: "VALIDATION", expected: this.#allowed });
  }

  /** Checks `value` is allowed in the `options`. */
  canUse(value: unknown): value is T[number] {
    return isEnumerable(value) && this.#allowed.includes(value);
  }
}

/**
 * Creates a new enumerated schema that only receives the given `options`.
 */
export function enumerated<E extends readonly Enumerable[]>(
  ...options: E
): SchemaEnumerated<E> {
  return new SchemaEnumerated(options);
}

/** Check one `value` as `Enumerable`. */
export function isEnumerable(value: unknown): value is Enumerable {
  return typeof value === "string" || typeof value === "number";
}
