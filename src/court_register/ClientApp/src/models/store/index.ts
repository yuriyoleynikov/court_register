import { computed, observable } from 'mobx';

import { StoreAuth } from './StoreAuth';
import { StoreAdmin } from './StoreAdmin';

import { StorePageUnits } from './StorePageUnits';
import { StorePageUnit } from './StorePageUnit';
import { StorePageCases } from './StorePageCases';
import { StorePageCase } from './StorePageCase';
import { StorePageUser } from './StorePageUser';
import { StorePageUserManagement } from './StorePageUserManagement';

export class Store {
    auth = new StoreAuth();
    admin = new StoreAdmin();
    page = new StorePage();
    @computed get isLoading() {
        return this.auth.loading || this.admin.loading || this.page.userManagement.loading ||
            this.page.cases.loading || this.page.case.loading ||
            this.page.units.loading || this.page.unit.loading
    }
}

export class StorePage {
    units = new StorePageUnits();
    unit = new StorePageUnit();

    cases = new StorePageCases();
    case = new StorePageCase();

    user = new StorePageUser();
    userManagement = new StorePageUserManagement();
}

export const store = new Store();
(window as any).store = store;