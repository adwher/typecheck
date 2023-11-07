import { SchemaContext } from "../context.ts";
import { createError, SchemaError, SchemaIssue } from "../errors.ts";
import { Schema } from "../schema.ts";
import { isObj } from "../types.ts";

/** Allowed types to be a key of `SchemaRecord`. */
export type SchemaRecordKey = string | number | symbol;

export class SchemaRecord<V> extends Schema<Record<SchemaRecordKey, V>> {
  /**
   * Creates a new `object` schema where all the values as `V`.
   * @param wrapped Schema of each `value`.
   */
  constructor(readonly wrapped: Schema<V>) {
    super();
  }

  check(value: unknown, context: SchemaContext) {
    type R = Record<SchemaRecordKey, V>;

    if (!isObj<R>(value)) {
      return createError(context, {
        message: `Must be a "object", got "${typeof value}"`,
      });
    }

    const final: R = {} as R;
    const issues: SchemaIssue[] = [];

    for (const key in value) {
      const content = value[key];

      const scope: SchemaContext = {
        path: [...context.path, String(key)],
      };

      const output = this.wrapped.check(content, scope);

      if (output instanceof SchemaError) {
        issues.push(...output.issues);
        continue;
      }

      final[key] = output;
    }

    if (issues.length > 0) {
      return createError(context, { issues });
    }

    return final;
  }
}

/** Creates a new `object` schema where all the values as `V`. */
export function record<V>(value: Schema<V>) {
  return new SchemaRecord(value);
}
