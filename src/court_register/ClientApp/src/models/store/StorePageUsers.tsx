import { observable, action } from 'mobx';
import { User } from '../';

export class StorePageUsers {
    @observable users: User[] | null = null;
    @observable loading = false;

    @action.bound async loadUsers(active: boolean) {
        this.loading = true;
        let response = await fetch(`api/users?active=${active}`, {
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
            }
        });

        this.users = await response.json();
        this.loading = false;
    }

    @action.bound async getUserByEmail(email: string) {
        let response = await fetch(`api/user/${email}`, {
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
            }
        });

        let userSystem = await response.json();
        return userSystem.current;
    }

    @action.bound async changePersonalUser(user: User) {
        let response = await fetch(`api/user`, {
            method: 'PUT',
            body: JSON.stringify(user),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
            }
        });

        await response.json();
    }

    @action.bound async changeUserByEmail(email: string, user: User) {
        let response = await fetch(`api/user/${email}`, {
            method: 'PUT',
            body: JSON.stringify(user),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
            }
        });

        await response.json();
    }

    @action.bound async activateUser(email: string) {
        this.loading = true;
        let response = await fetch(`api/user/activate/${email}`, {
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
            }
        });

        await response.json();
        this.loadUsers(true);
        this.loading = false;
    }

    @action.bound async deactivateUser(email: string) {
        this.loading = true;
        let response = await fetch(`api/user/deactivate/${email}`, {
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
            }
        });

        await response.json();
        this.loadUsers(true);
        this.loading = false;
    }
}