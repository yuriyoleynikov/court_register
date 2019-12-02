import { observable } from 'mobx'
import { Auth } from './Auth';
import { Counter } from './Counter';
import { Admin } from './Admin';
import { UnitStore } from './UnitStore';

export class Store {
    auth = new Auth();
    units = new UnitStore();
    counter = new Counter();
    admin = new Admin();

    //@observable data = 'abc'

    //get data2() {
    //    return this.data.toUpperCase();
    //}
}
