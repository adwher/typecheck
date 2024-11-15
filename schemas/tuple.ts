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

export const SCHEMA_TUPLE_NAME = "SCHEMA_TUPLE";

const ISSUE_TYPE = failure({ reason: "TYPE", expected: "array" });

/** Creates a new schema tuple of type `[A, B, ...C]`. */
export class SchemaTuple<S extends readonly Schema[]> implements SchemaFrom<S> {
  readonly name = SCHEMA_TUPLE_NAME;

  /**
   * Creates a new schema tuple of `T`.
   * @param schema Shape of the schema.
   */
  constructor(readonly schemas: S) {}

  check(value: unknown, context: Context): CheckFrom<S> {
    if (isArr(value) === false) {
      return ISSUE_TYPE;
    }

    const final = value;
    const size = value.length | this.schemas.length;
    const issues: Issue[] = [];

    for (let index = 0; index < size; index++) {
      const schema: S[number] = this.schemas[index];

      if (!schema) {
        if (context.strict && !context.verbose) {
          return GENERIC_FAILURE;
        }

        if (context.strict) {
          issues.push({ reason: "PRESENT", position: index });
        }

        continue;
      }

      const commit = schema.check(value[index], context);

      if (commit === undefined) {
        continue;
      }

      if (commit.success) {
        final[index] = commit.value;
        continue;
      }

      if (!context.verbose) {
        return GENERIC_FAILURE;
      }

      issues.push({
        reason: "VALIDATION",
        issues: commit.issues,
        position: index,
      });
    }

    if (issues.length === 0) {
      return success(final as Infer<S>);
    }

    return failure(issues);
  }
}

/** Creates a new schema tuple of type `[A, B, ...C]`. */
export function tuple<
  A extends Schema,
  B extends Schema,
  C extends readonly Schema[],
>(first: A, second: B, ...rest: C): SchemaTuple<[A, B, ...C]> {
  return new SchemaTuple([first, second, ...rest]);
}
