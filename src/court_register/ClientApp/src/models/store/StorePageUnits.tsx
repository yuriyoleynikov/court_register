import { observable, action, computed } from 'mobx';
import { Unit } from '../';

declare var window: any;

export class StorePageUnits {
    @observable units: Unit[] | null = null;
    @observable loading = false;
    @observable deletedId: number | null = null;

    @action.bound setDeletedId(id: number | null) {
        this.deletedId = id;
    }

    @action.bound async createUnit() {
        this.loading = true;
        let response = await fetch(`api/unit/create`, {
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
            }
        });

        let _id: number | null = await response.json();
        this.loading = false;

        window.history.pushState(null, '', `/management/unit?_id=${_id}`);
    }

    @action.bound async deleteUnitById(id: number | null) {
        this.loading = true;
        this.deletedId = null;
        let response = await fetch(`api/unit/delete?_id=${id}`, {
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
            }
        });

        await response.json();
        this.loadUnits();
    }

    @action.bound async loadUnits() {
        this.loading = true;
        let response = await fetch(`api/units`, {
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
            }
        });

        this.units = await response.json();
        this.loading = false;
    }
}