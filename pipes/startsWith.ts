import { SchemaContext } from "../context.ts";
import { createError } from "../errors.ts";

/**
 * Check the `value` starts with `search`.
 */
export function startsWith(
  search: string,
  message = `Must start with "${search}"`,
) {
  return function (value: string, context: SchemaContext) {
    if (value.startsWith(search)) {
      return value;
    }

    return createError(context, { message });
  };
}
