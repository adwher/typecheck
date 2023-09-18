import { SchemaContext } from "../context.ts";
import { error, SchemaError, SchemaIssue } from "../errors.ts";
import { Infer, Schema } from "../schema.ts";
import { isArr } from "../types.ts";

export class SchemaTuple<
  S extends readonly [...Schema[]],
> extends Schema<Infer<S>> {
  /**
   * Creates a new schema tuple of `T`.
   * @param schema Shape of the schema.
   */
  constructor(readonly schemas: S) {
    super();
  }

  check(value: unknown, context: SchemaContext) {
    if (!isArr(value)) {
      return error(context, {
        message: `Must be an "tuple", got "${typeof value}"`,
      });
    }

    const size = value.length;
    const final = new Array(size);
    const issues: SchemaIssue[] = [];

    for (let index = 0; index < size; index++) {
      const received = value[index];
      const schema = this.schemas[index];

      const scope: SchemaContext = {
        path: [...context.path, index],
      };

      if (!schema && context.strict === true) {
        const message = `Must be in the tuple definition`;
        issues.push({ ...scope, message });
      }

      if (!schema) {
        continue;
      }

      const output = schema.check(received, scope);

      if (output instanceof SchemaError) {
        issues.push(...output.issues);
        continue;
      }

      final[index] = output;
    }

    if (issues.length > 0) {
      return error(context, { issues });
    }

    return value as Infer<S>;
  }
}

/** Creates a new schema tuple of `T`. */
export function tuple<S extends readonly [...Schema[]]>(...schemas: S) {
  return new SchemaTuple(schemas);
}
