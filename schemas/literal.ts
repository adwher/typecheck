import { SchemaContext } from "../context.ts";
import { error } from "../errors.ts";
import { Schema } from "../schema.ts";

type Literal = string | number | bigint | boolean | null | undefined;

export class SchemaLiteral<L extends Literal> extends Schema<L> {
  /**
   * Creates a new `L` schema, where only one value is allowed.
   * @param literal One to rule-them all
   */
  constructor(private literal: L) {
    super();
  }

  check(value: unknown, context: SchemaContext) {
    if (value === this.literal) {
      return value as L;
    }

    return error(context, {
      message: `Must be "${this.literal}", got "${value}"`,
    });
  }
}

/** Creates a new `L` schema, where only one value is allowed. */
export function literal<L extends Literal>(literal: L) {
  return new SchemaLiteral(literal);
}
