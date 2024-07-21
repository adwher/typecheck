import type { Context } from "../context.ts";
import type { Issue } from "../errors.ts";
import { type Check, failure, type Schema, success } from "../schema.ts";
import { isObj } from "../types.ts";

/** Allowed types to be a key of `SchemaRecord`. */
export type SchemaRecordKey = string | number | symbol;

/** @internal Shortcut to the schema inference. */
type ThisInfer<V extends Schema> = Record<SchemaRecordKey, V>;

/** @internal Shortcut to the schema extension. */
type ThisFrom<S extends Schema> = Schema<ThisInfer<S>>;

export const SCHEMA_RECORD_NAME = "SCHEMA_RECORD";

const ISSUE_GENERIC = failure();
const ISSUE_TYPE = failure({ reason: "TYPE", expected: "object" });

export class SchemaRecord<S extends Schema> implements ThisFrom<S> {
  readonly name = SCHEMA_RECORD_NAME;

  /**
   * Creates a new `object` schema where all the values as `V`.
   * @param schema Schema of each `value`.
   */
  constructor(readonly schema: S) {}

  check(value: unknown, context: Context): Check<ThisInfer<S>> {
    type R = ThisInfer<S>;

    if (isObj<R>(value) === false) {
      return ISSUE_TYPE;
    }

    const final = value;
    const issues: Issue[] = [];

    for (const key in value) {
      const commit = this.schema.check(value[key], context);

      if (commit === undefined) {
        continue;
      }

      if (commit.success) {
        final[key] = commit.value;
        continue;
      }

      if (context.verbose === false) {
        return ISSUE_GENERIC;
      }

      issues.push({
        reason: "VALIDATION",
        issues: commit.issues,
        position: key,
      });
    }

    if (issues.length === 0) {
      return success(final);
    }

    return failure(issues);
  }
}

/** Creates a new `object` schema where all the values as `V` like `Record<unknown, V>`. */
export function record<V extends Schema>(value: V): SchemaRecord<V> {
  return new SchemaRecord<V>(value);
}
