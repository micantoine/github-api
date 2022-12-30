import { useSyncExternalStore , useCallback} from 'react';
import type { Store } from '../stores/helper';

export const useStore = <T, S>(
  store: Store<S>,
  selector: (state: S) => T extends any ? T : S
) => {
  return useSyncExternalStore(
    store.subscribe,
    useCallback(() => selector(store.getState()), [store, selector])
  )
}