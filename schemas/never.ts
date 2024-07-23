import { type Check, failure, type Schema } from "../schema.ts";

export const SCHEMA_NEVER_NAME = "SCHEMA_NEVER";

const ISSUE_GENERIC = failure({ reason: "PRESENT" });

/** Creates a new `never` schema. */
export class SchemaNever implements Schema<never> {
  readonly name = SCHEMA_NEVER_NAME;

  check(): Check<never> {
    return ISSUE_GENERIC;
  }
}

/** Creates a new `never` schema. */
export function never(): SchemaNever {
  return new SchemaNever();
}
