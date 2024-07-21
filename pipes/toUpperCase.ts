import type { Pipe } from "../schemas/pipe.ts";

/**
 * Transform the `value` to upper case using `.toUpperCase`.
 */
export function toUpperCase(): Pipe<string> {
  return function (value: string) {
    return value.toUpperCase();
  };
}
