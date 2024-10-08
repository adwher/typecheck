import type { Context } from "../context.ts";
import type { Issue } from "../errors.ts";
import {
  type CheckFrom,
  failure,
  GENERIC_FAILURE,
  type Infer,
  type Schema,
  type SchemaFrom,
  success,
} from "../schema.ts";
import { isArr } from "../types.ts";

export const SCHEMA_ARRAY_NAME = "SCHEMA_ARRAY";

const ISSUE_TYPE = failure({ reason: "TYPE", expected: "array" });

export class SchemaArray<S extends Schema> implements SchemaFrom<S[]> {
  readonly name = SCHEMA_ARRAY_NAME;

  /**
   * Creates a new schema array of `T`.
   * @param schema Shape of the schema.
   */
  constructor(readonly schema: S) {}

  check(value: unknown, context: Context): CheckFrom<S[]> {
    type T = Infer<S>;

    if (isArr<T>(value) === false) {
      return ISSUE_TYPE;
    }

    const final = value;
    const issues: Issue[] = [];

    for (let index = 0; index < value.length; index++) {
      const commit = this.schema.check(value[index], context);

      if (commit === undefined) {
        continue;
      }

      if (commit.success === true) {
        final[index] = commit.value;
        continue;
      }

      if (context.verbose === false) {
        return GENERIC_FAILURE;
      }

      issues.push({
        reason: "VALIDATION",
        issues: commit.issues,
        position: index,
      });
    }

    if (issues.length === 0) {
      return success(value);
    }

    return failure(issues);
  }
}

/**
 * Creates a new schema array of `T`.
 * @param schema Shape of the schema.
 */
export function array<S extends Schema>(schema: S): SchemaArray<S> {
  return new SchemaArray(schema);
}
