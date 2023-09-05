const WORD_REGEX = /(^\w{1})|(\s+\w{1})/g;

/**
 * Transform the `value` to capitalize style.
 * @example ```ts
 * const NameSchema = pipe(string(), toCapitalize());
 * ```
 */
export function toCapitalize() {
  return function (value: string) {
    return value.replace(WORD_REGEX, (letter) => letter.toUpperCase());
  };
}
