import { type Check, type Schema } from "../schema.ts";

export const SCHEMA_UNKNOWN_NAME = "SCHEMA_UNKNOWN";

/** Creates a new `unknown` schema. */
export class SchemaUnknown implements Schema<unknown> {
  readonly name = SCHEMA_UNKNOWN_NAME;

  check(): Check<unknown> {
    return undefined;
  }
}

/** Creates a new `unknown` schema. */
export function unknown(): SchemaUnknown {
  return new SchemaUnknown();
}
