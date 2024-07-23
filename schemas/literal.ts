import { type Check, failure, type Schema } from "../schema.ts";

/** Allowed types as literals. */
export type Literal = string | number | bigint | boolean | null;

export const SCHEMA_LITERAL_NAME = "SCHEMA_LITERAL";

/**
 * Creates a new `L` schema, where only one value is allowed.
 */
export class SchemaLiteral<L extends Literal> implements Schema<L> {
  readonly name = SCHEMA_LITERAL_NAME;

  /**
   * Creates a new `L` schema, where only one value is allowed.
   * @param literal One to rule-them all
   */
  constructor(readonly literal: L) {}

  check(value: unknown): Check<L> {
    if (value === this.literal) {
      return undefined;
    }

    return failure({
      reason: "VALIDATION",
      expected: this.literal,
      received: value,
    });
  }
}

/** Creates a new `L` schema, where only one value is allowed. */
export function literal<L extends Literal>(literal: L): SchemaLiteral<L> {
  return new SchemaLiteral(literal);
}
