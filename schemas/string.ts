import { type Check, failure, type Schema } from "../schema.ts";

export const SCHEMA_STRING_NAME = "SCHEMA_STRING";

const ISSUE_TYPE = failure({ reason: "TYPE", expected: "string" });

export class SchemaString implements Schema<string> {
  readonly name = SCHEMA_STRING_NAME;

  check(value: unknown): Check<string> {
    return typeof value === "string" ? undefined : ISSUE_TYPE;
  }
}

/** Creates a new `string` schema. */
export function string(): SchemaString {
  return new SchemaString();
}
