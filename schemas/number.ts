import { type Check, failure, type Schema } from "../schema.ts";

export const SCHEMA_NUMBER_NAME = "SCHEMA_NUMBER";

const ISSUE_TYPE = failure({ reason: "TYPE", expected: "number" });

/** Creates a new `number` schema. */
export class SchemaNumber implements Schema<number> {
  readonly name = SCHEMA_NUMBER_NAME;

  check(value: unknown): Check<number> {
    return typeof value === "number" ? undefined : ISSUE_TYPE;
  }
}

/** Creates a new `number` schema. */
export function number(): SchemaNumber {
  return new SchemaNumber();
}
