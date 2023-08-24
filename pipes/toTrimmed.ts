import { SchemaPipe } from "../pipes.ts";

interface Options {
  leading?: boolean;
  trailing?: boolean;
}

/**
 * Transform the `value` using `.trim`, `.trimStart` or `.trimEnd`.
 * @example ```
 * const NameSchema = string(toTrimmed());
 * ```
 * @example ```
 * const NameSchema = string(toTrimmed({ leading: true }));
 * ```
 */
export function toTrimmed(options?: Options): SchemaPipe<string> {
  return function (value) {
    let final = value;

    if (!options || options?.leading === true) {
      final = final.trimStart();
    }

    if (!options || options?.trailing === true) {
      final = final.trimEnd();
    }

    return final;
  };
}
