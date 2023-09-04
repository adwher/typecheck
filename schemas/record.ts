import { SchemaContext } from "../context.ts";
import { error, SchemaError, SchemaIssue } from "../errors.ts";
import { Schema } from "../schema.ts";
import { isObj } from "../types.ts";

type Key = string | number | symbol;

export class SchemaRecord<
  K extends Key,
  V,
  R extends object = Record<K, V>,
> extends Schema<R> {
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
    type O = Record<Key, unknown>;

    if (!isObj<O>(value)) {
      return error(context, {
        message: `Must be a "object", got "${typeof value}"`,
      });
    }

    const final: O = {};
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

    return final as R;
  }
}

/** Creates a new `object` schema where all the keys are `K` and the values `V`. */
export function record<K extends Key, V>(
  key: Schema<K>,
  value: Schema<V>,
) {
  return new SchemaRecord(key, value);
}
