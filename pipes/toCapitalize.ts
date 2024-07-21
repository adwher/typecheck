import type { Pipe } from "../schemas/pipe.ts";

const WORD_REGEX = /(^\w{1})|(\s+\w{1})/g;

/**
 * Transform the `value` to capitalize style.
 */
export function toCapitalize(): Pipe<string> {
  return function (value: string) {
    return value.replace(WORD_REGEX, (letter) => letter.toUpperCase());
  };
}
