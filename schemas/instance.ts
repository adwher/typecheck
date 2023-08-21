import { SchemaContext } from "../context.ts";
import { error } from "../errors.ts";
import { Schema } from "../schema.ts";
import { Instanciable } from "../types.ts";

export class SchemaInstance<
  O extends Instanciable,
  I = InstanceType<O>,
> extends Schema<I> {
  /**
   * Creates a new `O` schema validated with `instanceof`.
   * @param origin Instanciable element like a `class`.
   */
  constructor(private origin: O) {
    super();
  }

  check(value: unknown, context: SchemaContext) {
    if (value instanceof this.origin) {
      return value as I;
    }

    return error(context, {
      message: `Must be a instance of "${this.origin.name}"`,
    });
  }
}

/** Creates a new `O` schema validated with `instanceof`. */
export function instance<O extends Instanciable>(origin: O) {
  return new SchemaInstance(origin);
}
