import { observable } from 'mobx'
import { Auth } from './Auth';
import { Counter } from './Counter';

export class Store {
    auth = new Auth();
    counter = new Counter();

    @observable data = 'abc'

    get data2() {
        return this.data.toUpperCase();
    }
}
