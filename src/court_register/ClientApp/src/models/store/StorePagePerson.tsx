import { observable, action } from 'mobx';
import { Person } from '../';

export class StorePagePerson {
    @observable person: Person | null = null;
    @observable loading = false;

    @action.bound async loadPersonById(_id: string | null) {        
        this.loading = true;
        let response = await fetch(`api/person?_id=${_id}`, {
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
            }
        });

        let result = await response.json();
        this.person = result.current;
        this.loading = false;
    }

    @action.bound async updatePerson(currentPerson: Person) {
        this.loading = true;
        let response = await fetch(`api/person`, {
            method: 'POST',
            body: JSON.stringify(currentPerson),
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