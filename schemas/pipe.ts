import { SchemaContext } from "../context.ts";
import { error, SchemaError, SchemaIssue } from "../errors.ts";
import { Infer, Schema } from "../schema.ts";

/**
 * Allow to transform the initial `value` and add extra validations with more details to the schemas.
 * @param value Given value of the schema.
 * @param context Context of the current step.
 */
export type Pipe<T> = (
  value: T,
  context: SchemaContext,
) => T | SchemaError;

/** List of multiple schema pipes of the same `T`. */
export type Pipes<T> = Pipe<T>[];

/** List of multiple schema pipes of the same `Infer<S>`.  */
export type PipesTo<S extends Schema> = Pipe<Infer<S>>[];

export class SchemaPipe<R> extends Schema<R> {
  /**
   * TO-DO
   * @param schema TO-DO
   * @param pipes TO-DO
   */
  constructor(
    private schema: Schema<R>,
    private pipes: Pipes<R>,
  ) {
    super();
  }

  check(value: unknown, context: SchemaContext): SchemaError | R {
    const output = this.schema.check(value, context);

    if (output instanceof SchemaError) {
      return output;
    }

    let final: R = output;
    const issues: SchemaIssue[] = [];

    for (const pipe of this.pipes) {
      const output = pipe(final, context);

      if (output instanceof SchemaError) {
        issues.push(...output.issues);
        continue;
      }

      final = output;
    }

    if (issues.length === 0) {
      return final;
    }

    return error(context, { issues });
  }
}

export function pipe<S extends Schema>(schema: S, ...pipes: PipesTo<S>): S;

/** Create a chain of `pipes` once the `schema` return the validated value. */
export function pipe<S extends Schema>(schema: S, ...pipes: PipesTo<S>) {
  return new SchemaPipe(schema, pipes);
}
