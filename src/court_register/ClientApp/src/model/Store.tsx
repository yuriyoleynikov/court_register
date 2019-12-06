import { observable } from 'mobx'
import { Auth } from './Auth';
import { Counter } from './Counter';
import { Admin } from './Admin';
import { UnitStore } from './UnitStore';
import { CaseStore } from './CaseStore';
import { NewCase } from './NewCase';

export class Store {
    auth = new Auth();
    units = new UnitStore();
    counter = new Counter();
    admin = new Admin();
    case = new CaseStore();
    new_case = new NewCase();

    //@observable data = 'abc'

    //get data2() {
    //    return this.data.toUpperCase();
    //}
}
