/**
 * Join multiple classNames
 * @param classes the list of classnames
 * @returns the className attribute value
 */
export function classNames(classes: Array<string|undefined>): string {
  return classes.filter((val) => val !== undefined).join(' ');
}