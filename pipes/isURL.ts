import { SchemaContext } from "../context.ts";
import { error } from "../errors.ts";

const ERROR_MESSAGE = "Must be a valid URL";

/**
 * Check the `value` using the `URL` APIs.
 * @example ```ts
 * const SourceSchema = pipe(string(), isURL());
 * ```
 */
export function isURL(message = ERROR_MESSAGE) {
  return function (value: string, context: SchemaContext) {
    if (URL.canParse(value)) {
      return value;
    }

    return error(context, { message });
  };
}
