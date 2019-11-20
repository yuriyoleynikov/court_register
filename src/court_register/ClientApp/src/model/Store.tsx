import { observable } from 'mobx'
import { Auth } from './Auth';
import { Counter } from './Counter';
import { Admin } from './Admin';

export class Store {
    auth = new Auth();
    counter = new Counter();
    admin = new Admin();

    //@observable data = 'abc'

    //get data2() {
    //    return this.data.toUpperCase();
    //}
}
