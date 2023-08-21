import { SchemaContext } from "../context.ts";
import { error } from "../errors.ts";
import { Schema } from "../schema.ts";

export class SchemaNever extends Schema<never> {
  check(value: unknown, context: SchemaContext) {
    return error(context, {
      message: `Must be "never", got "${typeof value}"`,
    });
  }
}

/** Creates a new `never` schema. */
export function never() {
  return new SchemaNever();
}
