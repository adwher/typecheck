import { SchemaContext } from "../context.ts";
import { error } from "../errors.ts";
import { Schema } from "../schema.ts";
import { isBool } from "../types.ts";

export class SchemaBoolean extends Schema<boolean> {
  check(value: unknown, context: SchemaContext) {
    if (isBool(value)) {
      return value;
    }

    const message = `Must be a "boolean", got "${typeof value}"`;
    return error(context, { message });
  }
}

/** Creates a new `boolean` schema. */
export function boolean() {
  return new SchemaBoolean();
}
