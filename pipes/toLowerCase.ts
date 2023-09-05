/**
 * Transform the `value` to lower case using `.toLowerCase`.
 * @example ```ts
 * const NickNameSchema = pipe(string(), toLowerCase());
 * ```
 */
export function toLowerCase() {
  return function (value: string) {
    return value.toLowerCase();
  };
}
