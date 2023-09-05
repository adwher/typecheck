import { Schema } from "../schema.ts";

export class SchemaUnknown extends Schema<unknown> {
  check(value: unknown) {
    return value;
  }
}

/** Creates a new `unknown` schema. */
export function unknown() {
  return new SchemaUnknown();
}
