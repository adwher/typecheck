import { SchemaContext } from "../context.ts";
import { error, SchemaError, SchemaIssue } from "../errors.ts";
import { Schema } from "../schema.ts";
import { isObj } from "../types.ts";

export type SchemaRecordKey = string | number | symbol;

export class SchemaRecord<
  K extends SchemaRecordKey,
  V,
  R extends object = Record<K, V>,
> extends Schema<R> {
  /**
   * Creates a new `object` schema where all the keys are `K` and the values `V`.
   * @param key Schema of each `key`.
   * @param value Schema of each `value`.
   */
  constructor(private key: Schema<K>, private value: Schema<V>) {
    super();
  }

  check(value: unknown, context: SchemaContext) {
    type Output = Record<SchemaRecordKey, unknown>;

    if (!isObj<Output>(value)) {
      return error(context, {
        message: `Must be a "object", got "${typeof value}"`,
      });
    }

    const final: Output = {};
    const entries = Object.entries(value);
    const issues: SchemaIssue[] = [];

    for (const [index, content] of entries) {
      const scope: SchemaContext = {
        path: [...context.path, String(index)],
      };

      const key = this.key.check(index, scope);

      if (key instanceof SchemaError) {
        issues.push(...key.issues);
        continue;
      }

      const value = this.value.check(content, scope);

      if (value instanceof SchemaError) {
        issues.push(...value.issues);
        continue;
      }

      final[key] = value;
    }

    if (issues.length > 0) {
      return error(context, {
        message: "Must have the given key-value structure",
        issues,
      });
    }

    return final as R;
  }
}

/** Creates a new `object` schema where all the keys are `K` and the values `V`. */
export function record<K extends SchemaRecordKey, V>(
  key: Schema<K>,
  value: Schema<V>,
) {
  return new SchemaRecord(key, value);
}
