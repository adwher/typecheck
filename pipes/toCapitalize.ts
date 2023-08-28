const WORD_REGEX = /(^\w{1})|(\s+\w{1})/g;

/**
 * Transform the `value` to capitalize style.
 * @example ```
 * const NameSchema = string(toCapitalize());
 * ```
 */
export function toCapitalize() {
  return function (value: string) {
    return value.replace(WORD_REGEX, (letter) => letter.toUpperCase());
  };
}