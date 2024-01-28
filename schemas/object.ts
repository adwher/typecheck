import { Context } from "../context.ts";
import { Issue } from "../errors.ts";
import { failure, Infer, Schema, SchemaFrom, success } from "../schema.ts";
import { isObj } from "../types.ts";

/** Sets the allowed keys for a shape. */
export type SchemaShapeKey = string | number | symbol;

/** Defines an record of `keys` and their schemas, useful for objects. */
export type SchemaShape = Record<SchemaShapeKey, Schema>;

export const SCHEMA_OBJECT_NAME = "SCHEMA_OBJECT";

const ISSUE_GENERIC = failure();
const ISSUE_TYPE = failure({ reason: "TYPE", expected: "object" });

export class SchemaObject<S extends SchemaShape> implements SchemaFrom<S> {
  readonly name = SCHEMA_OBJECT_NAME;

  /**
   * Create a new schema with the shape of an `object`.
   * @param shape Shape of the schema.
   * @param rest Schema for the rest of the fields.
   */
  constructor(readonly shape: S) {}

  check(value: unknown, context: Context) {
    type R = Infer<S>;

    if (isObj<R>(value) === false) {
      return ISSUE_TYPE;
    }

    const final = value;
    const issues: Issue[] = [];

    for (const key in this.shape) {
      const schema = this.shape[key];

      if (!schema) {
        continue;
      }

      const commit = schema.check(value[key], context);

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

/** Creates a new `object` schema using a `ObjectShape`. */
export function object<S extends SchemaShape>(shape: S) {
  return new SchemaObject(shape);
}
