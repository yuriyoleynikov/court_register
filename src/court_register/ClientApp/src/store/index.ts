import { Auth } from './../models/Auth';
import { Admin } from './../models/Admin';
import { UnitStore } from './../models/UnitStore';
import { CaseStore } from './../models/CaseStore';
import { NewCase } from './../models/NewCase';
import { CourtStore } from './../models/CourtStore';
import { UserPage } from '../models/UserPage';

export class Store {
    auth = new Auth();
    units = new UnitStore();
    admin = new Admin();
    case = new CaseStore();
    new_case = new NewCase();
    court = new CourtStore();
    user_page = new UserPage();
}

export const store = new Store();
(window as any).store = store;