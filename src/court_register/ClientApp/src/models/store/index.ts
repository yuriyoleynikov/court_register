import { computed, observable } from 'mobx';

import { StoreAuth } from './StoreAuth';
import { StoreAdmin } from './StoreAdmin';

import { StorePageUnits } from './StorePageUnits';
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
            this.page.userManagement.loading || this.page.cases.loading || this.page.case.loading
    }
}

export class StorePage {
    units = new StorePageUnits();
    cases = new StorePageCases();
    case = new StorePageCase();
    user = new StorePageUser();
    userManagement = new StorePageUserManagement();
}

export const store = new Store();
(window as any).store = store;