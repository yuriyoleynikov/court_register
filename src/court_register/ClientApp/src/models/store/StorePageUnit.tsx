import { observable, action } from 'mobx';
import { Unit } from '../';

export class StorePageUnit {
    @observable unit: Unit | null = null;
    @observable loading = false;

    @action.bound async loadUnitById(_id: string | null) {
        this.loading = true;
        let response = await fetch(`api/unit?_id=${_id}`, {
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
            }
        });

        this.unit = new Unit();
        let result = await response.json();
        this.unit = result.current;
        this.loading = false;
    }

    @action.bound async updateUnit(currentUnit: Unit) {
        this.loading = true;
        let response = await fetch(`api/unit`, {
            method: 'POST',
            body: JSON.stringify(currentUnit),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
            }
        });

        await response.json();
        this.loading = false;
    }
}