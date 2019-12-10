import { Store } from './../models/Store'

export const store = new Store();

(window as any).store = store;