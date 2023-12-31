import { SchemaContext } from "../context.ts";
import { createError } from "../errors.ts";
import { Schema } from "../schema.ts";

/** Allowed types as literals. */
export type Literal = string | number | bigint | boolean | null;

export class SchemaLiteral<L extends Literal> extends Schema<L> {
  /**
   * Creates a new `L` schema, where only one value is allowed.
   * @param literal One to rule-them all
   */
  constructor(readonly literal: L) {
    super();
  }

  check(value: unknown, context: SchemaContext) {
    if (value === this.literal) {
      return value as L;
    }

    return createError(context, {
      message: `Must be "${this.literal}", got "${value}"`,
    });
  }
}

/** Creates a new `L` schema, where only one value is allowed. */
export function literal<L extends Literal>(literal: L) {
  return new SchemaLiteral(literal);
}
