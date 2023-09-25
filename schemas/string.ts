import { SchemaContext } from "../context.ts";
import { error } from "../errors.ts";
import { Schema } from "../schema.ts";
import { isStr } from "../types.ts";

export class SchemaString extends Schema<string> {
  check(value: unknown, context: SchemaContext) {
    if (isStr(value)) {
      return value;
    }

    const message = `Must be a "string", got "${typeof value}"`;
    return error(context, { message });
  }
}

/** Creates a new `string` schema. */
export function string() {
  return new SchemaString();
}
