import { observable, action } from 'mobx';
import { Court } from '../';
import { history } from '../.././router';

export class StorePageCourts {
    @observable courts: Court[] | null = null;
    @observable loading = false;
    @observable deletedId: number | null = null;

    @action.bound setDeletedId(id: number | null) {
        this.deletedId = id;
    }

    @action.bound async createCourt() {
        this.loading = true;
        let response = await fetch(`api/court/create`, {
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
            }
        });

        let _id: number | null = await response.json();
        this.loading = false;

        history.push(`/management/court?_id=${_id}`);
    }

    @action.bound async deleteCourtById(id: number | null) {
        this.loading = true;
        this.deletedId = null;
        let response = await fetch(`api/court/delete?_id=${id}`, {
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
            }
        });

        await response.json();
        this.loadCourts();
    }

    @action.bound async loadCourts() {
        this.loading = true;
        let response = await fetch(`api/courts`, {
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
            }
        });

        this.courts = await response.json();
        this.loading = false;
    }
}