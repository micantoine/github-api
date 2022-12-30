export type Store<T=any> = {
  getState: () => T;
  setState: (fn: (state: T) => T) => void;
  subscribe: (listener: unknown) => () => boolean;
}

export const createStore = <T>(initialState: T): Store<T> => {
  const listeners = new Set();
  let state = initialState;
  
  const getState = () => state;

  const setState = (fn: (s:T) => T) => {
    state = fn(state);
    listeners.forEach((l:any) => l());
  }
  const subscribe = (listener: unknown) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }
  return { getState, setState, subscribe }
}