import { observable, action } from 'mobx';
import { Person } from '../';
import { history } from '../.././router';
import * as queryString from 'query-string';

export class StorePagePersons {
    @observable persons: Person[] | null = null;
    @observable loading = false;
    @observable deletedId: number | null = null;

    @action.bound setDeletedId(id: number | null) {
        this.deletedId = id;
    }

    @action.bound async createPerson(_type: string | null) {
        this.loading = true;
        let response = await fetch(`api/person/create?_type=${_type}`, {
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
            }
        });

        let _id: number | null = await response.json();
        this.loading = false;

        history.push(`/management/person?_id=${_id}`);
    }

    @action.bound async deletePersonById(id: number | null) {
        this.loading = true;
        this.deletedId = null;

        let query = queryString.parse(history.location.search);
        let _type = query._type as string || null;

        let response = await fetch(`api/person/delete?_id=${id}`, {
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
            }
        });

        await response.json();
        this.loadPersons(_type);
    }

    @action.bound async loadPersons(_type: string | null) {
        this.loading = true;
        let response = await fetch(`api/persons?_type=${_type}`, {
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
            }
        });

        this.persons = await response.json();
        this.loading = false;
    }
}