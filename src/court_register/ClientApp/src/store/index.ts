import { Auth } from './../models/Auth';
import { Admin } from './../models/Admin';
import { UnitStore } from './../models/UnitStore';
import { CaseStore } from './../models/CaseStore';
import { NewCase } from './../models/NewCase';

export class Store {
    auth = new Auth();
    units = new UnitStore();
    admin = new Admin();
    case = new CaseStore();
    new_case = new NewCase();
}

export const store = new Store();
(window as any).store = store;