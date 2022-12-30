import { createStore } from './helper';

export interface AlertState {
  title: string;
  message: string;
  show: boolean;
  color: '' | 'danger' | 'warning';
}

export const alertStore = {
  ...createStore<AlertState>({title: '', message: '', color: '', show: false}),
  turnOff: () => alertStore.setState((state) => ({...state, show: false})),
};
