import { useEffect, useRef, type EffectCallback,type DependencyList } from "react";

/**
 * Trigger a function after continuous invokes
 * @param effect the callback function
 * @param [deps=[]] If present, effect will only activate if the values in the list change
 * @param [delay=500] The delay to wait for in milliseconds
 * @param [opts={}] Options to use leading call instead of trailing; 
 */
export const useDebouncedEffect = (
    effect: EffectCallback,
    deps: DependencyList = [],
    delay: number = 500,
    opts?: {
      leading?: boolean,
    }
) => {
  const handler = useRef<NodeJS.Timeout>();

  return useEffect(() => {
    handler.current = setTimeout(effect, opts?.leading ? 0 : delay);

    return () => {
      clearTimeout(handler.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, delay, opts?.leading])
};