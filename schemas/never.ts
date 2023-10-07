import { SchemaContext } from "../context.ts";
import { createError } from "../errors.ts";
import { Schema } from "../schema.ts";

export class SchemaNever extends Schema<never> {
  check(value: unknown, context: SchemaContext) {
    const message = `Must be "never", got "${typeof value}"`;
    return createError(context, { message });
  }
}

/** Creates a new `never` schema. */
export function never() {
  return new SchemaNever();
}
