import { observable, action, computed } from "mobx";
import { User } from "./../MyClasses";

declare var window: any;

export class StorePageUserManagement {
    @observable user: User | null = null;
    @observable loading = false;
    @observable userMap = new Map<string, User>();

    @action.bound async loadUser(email: string|null) {
        this.loading = true;
        let response = await fetch(`api/user/${email}`, {
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
            }
        });

        let userSystem = await response.json();
        this.user = userSystem.current;
        this.loading = false;
    }

    @action.bound async loadUser2(email: string) {
        let user = this.userMap.get(email);
        if (user)
            return user;

        let response = await fetch(`api/user/${email}`, {
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
            }
        });

        let userSystem = await response.json();
        user = new User();
        user.first_name = userSystem.current.first_name;

        this.userMap.set(email, user);

        return user;
    }

    @action.bound async changePersonal(user: User) {
        console.log(user);
        let response = await fetch(`api/user`, {
            method: 'PUT',
            body: JSON.stringify(user),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
            }
        });

        await response.json();
    }

    @action.bound async activateUser(email: string) {
        this.loading = true;
        let response = await fetch(`api/user/activate/${email}`, {
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
            }
        });

        await response.json();
        this.loadUser(null);
        this.loading = false;
    }

    @action.bound async deactivateUser(email: string) {
        this.loading = true;
        let response = await fetch(`api/user/deactivate/${email}`, {
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
            }
        });

        await response.json();
        this.loadUser(null);
        this.loading = false;
    }
}