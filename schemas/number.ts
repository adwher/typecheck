import { SchemaContext } from "../context.ts";
import { createError } from "../errors.ts";
import { Schema } from "../schema.ts";
import { isNum } from "../types.ts";

export class SchemaNumber extends Schema<number> {
  check(value: unknown, context: SchemaContext) {
    if (isNum(value)) {
      return value;
    }

    const message = `Must be a "number", got "${typeof value}"`;
    return createError(context, { message });
  }
}

/** Creates a new `number` schema. */
export function number() {
  return new SchemaNumber();
}
