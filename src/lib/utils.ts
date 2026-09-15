/** Tiny class-name helper — avoids pulling in an extra dependency. */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * A value is considered "configured" once it is non-empty and no longer a
 * bracketed placeholder such as `[APPLICATION URL]`.
 *
 * Used to decide whether a CTA can safely point somewhere real. Declared as a
 * type predicate so callers get `string` after the check instead of
 * `string | null`.
 */
export function isConfigured(
  value: string | null | undefined,
): value is string {
  if (!value) return false;
  const trimmed = value.trim();
  if (trimmed.length === 0) return false;
  return !/^\[.*\]$/.test(trimmed);
}

/** Safe defaults for links that leave the site. */
export function externalLinkProps(href: string) {
  if (!isConfigured(href)) return {};
  return { target: "_blank" as const, rel: "noopener noreferrer" };
}
