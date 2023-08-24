import { error } from "../errors.ts";
import { SchemaPipe } from "../pipes.ts";

const ERROR_MESSAGE = "Must be a valid URL";

/**
 * Check the `value` using the `URL` APIs.
 * @example ```
 * const SourceSchema = string(isURL());
 * ```
 */
export function isURL(message = ERROR_MESSAGE): SchemaPipe<string> {
  return function (value, context) {
    if (URL.canParse(value)) {
      return value;
    }

    return error(context, { message });
  };
}
