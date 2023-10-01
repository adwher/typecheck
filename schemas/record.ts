import { SchemaContext } from "../context.ts";
import { error, SchemaError, SchemaIssue } from "../errors.ts";
import { Schema } from "../schema.ts";
import { isObj } from "../types.ts";

/** Allowed types to be a key of `SchemaRecord`. */
export type SchemaRecordKey = string | number | symbol;

export class SchemaRecord<
  K extends SchemaRecordKey,
  V,
> extends Schema<Record<K, V>> {
  /**
   * Creates a new `object` schema where all the keys are `K` and the values `V`.
   * @param key Schema of each `key`.
   * @param value Schema of each `value`.
   */
  constructor(
    readonly key: Schema<K>,
    readonly value: Schema<V>,
  ) {
    super();
  }

  check(value: unknown, context: SchemaContext) {
    type R = Record<K, V>;

    if (!isObj<R>(value)) {
      return error(context, {
        message: `Must be a "object", got "${typeof value}"`,
      });
    }

    const final: R = {} as R;
    const issues: SchemaIssue[] = [];

    for (const index in value) {
      const content = value[index];

      const scope: SchemaContext = {
        path: [...context.path, String(index)],
      };

      const key = this.key.check(index, scope);

      if (key instanceof SchemaError) {
        issues.push(...key.issues);
        continue;
      }

      const output = this.value.check(content, scope);

      if (output instanceof SchemaError) {
        issues.push(...output.issues);
        continue;
      }

      final[key] = output;
    }

    if (issues.length > 0) {
      return error(context, { issues });
    }

    return final;
  }
}

/** Creates a new `object` schema where all the keys are `K` and the values `V`. */
export function record<K extends SchemaRecordKey, V>(
  key: Schema<K>,
  value: Schema<V>,
) {
  return new SchemaRecord(key, value);
}
