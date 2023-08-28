interface Options {
  /**
   * @default true
   */
  leading?: boolean;
  /**
   * @default true
   */
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
export function toTrimmed(options?: Options) {
  const leading = options?.leading ?? true;
  const trailing = options?.trailing ?? true;

  return function (value: string) {
    let final = value;

    if (leading) {
      final = final.trimStart();
    }

    if (trailing) {
      final = final.trimEnd();
    }

    return final;
  };
}