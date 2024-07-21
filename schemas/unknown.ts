import { type Check, type Schema, success } from "../schema.ts";

export const SCHEMA_UNKNOWN_NAME = "SCHEMA_UNKNOWN";

export class SchemaUnknown implements Schema<unknown> {
  readonly name = SCHEMA_UNKNOWN_NAME;

  check(value: unknown): Check<unknown> {
    return success(value);
  }
}

/** Creates a new `unknown` schema. */
export function unknown(): SchemaUnknown {
  return new SchemaUnknown();
}
