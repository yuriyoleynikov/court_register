import { Store } from './model/Store'

export const store = new Store();

(window as any).store = store;