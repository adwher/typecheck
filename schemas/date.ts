import type { Check } from "../mod.ts";
import { failure, type Schema } from "../schema.ts";
import { isDate } from "../types.ts";

export const SCHEMA_DATE_NAME = "SCHEMA_DATE";

export class SchemaDate implements Schema<Date> {
  readonly name = SCHEMA_DATE_NAME;

  check(value: unknown): Check<Date> {
    if (isDate(value)) {
      return undefined;
    }

    return failure({
      reason: "TYPE",
      expected: "Date",
      received: typeof value,
    });
  }
}

/** Creates a new {@linkcode Date} schema. */
export function date(): SchemaDate {
  return new SchemaDate();
}
