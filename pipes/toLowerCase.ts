import { SchemaPipe } from "../pipes.ts";

/**
 * Transform the `value` to lower case using `.toLowerCase`.
 * @example ```ts
 * const NickNameSchema = string(toLowerCase());
 * ```
 */
export function toLowerCase(): SchemaPipe<string> {
  return function (value) {
    return value.toLowerCase();
  };
}
