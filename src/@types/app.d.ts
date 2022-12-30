/**
 * APP GLobal Types
 */

type TagNameProps = {
  tagName?: keyof HTMLElementTagNameMap
}

type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;