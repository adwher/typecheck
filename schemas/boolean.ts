import { type Check, failure, type Schema } from "../schema.ts";

export const SCHEMA_BOOLEAN_NAME = "SCHEMA_BOOLEAN";

const ISSUE_TYPE = failure({ reason: "TYPE", expected: "boolean" });

export class SchemaBoolean implements Schema<boolean> {
  readonly name = SCHEMA_BOOLEAN_NAME;

  check(value: unknown): Check<boolean> {
    return typeof value === "boolean" ? undefined : ISSUE_TYPE;
  }
}

/** Creates a new `boolean` schema. */
export function boolean(): SchemaBoolean {
  return new SchemaBoolean();
}
