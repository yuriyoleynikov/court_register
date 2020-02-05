import { observable, action } from 'mobx';
import { Court } from '../';

export class StorePageCourt {
    @observable court: Court | null = null;
    @observable loading = false;

    @action.bound async loadCourtById(_id: string | null) {
        this.loading = true;
        let response = await fetch(`api/court?_id=${_id}`, {
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
            }
        });

        let result = await response.json();
        this.court = result.current;
        this.loading = false;
    }

    @action.bound async updateCourt(currentCourt: Court) {
        this.loading = true;
        let response = await fetch(`api/court`, {
            method: 'POST',
            body: JSON.stringify(currentCourt),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
            }
        });

        await response.json();
        this.loading = false;
    }
}