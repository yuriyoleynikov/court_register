import { computed } from 'mobx';

import { StoreAuth } from './StoreAuth';

import { StorePageUnits } from './StorePageUnits';
import { StorePageUnit } from './StorePageUnit';
import { StorePageCourts } from './StorePageCourts';
import { StorePageCourt } from './StorePageCourt';
import { StorePageCases } from './StorePageCases';
import { StorePageCase } from './StorePageCase';
import { StorePageUsers } from './StorePageUsers';
import { StorePageUser } from './StorePageUser';

export class Store {
    auth = new StoreAuth();
    page = new StorePage();
    @computed get isLoading() {
        return this.auth.loading ||
            this.page.cases.loading || this.page.case.loading ||
            this.page.units.loading || this.page.unit.loading ||
            this.page.courts.loading || this.page.court.loading ||
            this.page.users.loading || this.page.user.loading
    }
}

export class StorePage {
    courts = new StorePageCourts();
    court = new StorePageCourt();

    units = new StorePageUnits();
    unit = new StorePageUnit();

    cases = new StorePageCases();
    case = new StorePageCase();

    users = new StorePageUsers();
    user = new StorePageUser();
}

export const store = new Store();
(window as any).store = store;