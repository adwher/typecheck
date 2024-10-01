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
import { isObj } from "../types.ts";

/** Sets the allowed keys for a shape. */
export type SchemaShapeKey = string | number | symbol;

/** Defines an record of `keys` and their schemas, useful for objects. */
export type SchemaShape = { [key: SchemaShapeKey]: Schema };

/** Extracts the shape from a `Schema`. */
export type SchemaInferShape<S extends Schema> = S extends Schema<infer T>
  ? { [K in keyof T]: Schema<T[K]> }
  : never;

/** Extracts the keys from a `Schema`. */
export type SchemaKeys<S extends Schema> = S extends
  Schema<infer T extends object> ? keyof T
  : never;

export const SCHEMA_OBJECT_NAME = "SCHEMA_OBJECT";

const ISSUE_TYPE = failure({ reason: "TYPE", expected: "object" });

/** Creates a new `object` schema using a `ObjectShape`. */
export class SchemaObject<S extends SchemaShape> implements SchemaFrom<S> {
  readonly name = SCHEMA_OBJECT_NAME;

  /**
   * Create a new schema with the shape of an `object`.
   * @param shape Shape of the schema.
   * @param rest Schema for the rest of the fields.
   */
  constructor(readonly shape: S) {}

  check(value: unknown, context: Context): CheckFrom<S> {
    type R = Infer<S>;

    if (isObj<R>(value) === false) {
      return ISSUE_TYPE;
    }

    const final = value;
    const issues: Issue[] = [];

    // Merge keys from both the shape and the value.
    const keys = new Set(Object.keys(this.shape).concat(Object.keys(value)));

    for (const key of keys) {
      const schema = this.shape[key];

      if (!schema) {
        if (context.strict && !context.verbose) {
          return GENERIC_FAILURE;
        }

        if (context.strict) {
          issues.push({ reason: "PRESENT", position: key });
        }

        continue;
      }

      const commit = schema.check(value[key], context);

      if (commit === undefined) {
        continue;
      }

      if (commit.success) {
        final[key as keyof S] = commit.value;
        continue;
      }

      if (context.verbose === false) {
        return GENERIC_FAILURE;
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
export function object<S extends SchemaShape>(shape: S): SchemaObject<S> {
  return new SchemaObject(shape);
}
