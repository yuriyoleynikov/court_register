import { observable, action, computed } from "mobx"
import { User } from "./../MyClasses";

declare var window: any;

export class StoreAdmin {
    @observable users: User[] | null = null;
    @observable loading = false;
    @computed get search() { return window.location.search }

    @action.bound async loadUsers(active: boolean) {
        this.loading = true;
        let response = await fetch(`api/users?active=${active}`, {
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
            }
        });

        this.users = await response.json();
        this.loading = false;
        //if (this.downloadedAuth2)
        //    return;

        //await loadAuth2();

        //await window.gapi.auth2.init({
        //    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID
        //});

        //console.log('init ok');
        //this.downloadedAuth2 = true;
        //this.getUser();
    }

    @action.bound async getUserByEmail(email: string) {
        let response = await fetch(`api/user/${email}`, {
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
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
                'Authorization': 'Bearer ' + window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
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
        this.loadUsers(true);
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
        this.loadUsers(true);
        this.loading = false;
    }

    //@action.bound async getUser() {
    //    let googleAuth = window.gapi.auth2.getAuthInstance();
    //    if (googleAuth.isSignedIn.get()) {
    //        this.loading = true;
    //        let data = await getUserPermissions(googleAuth.currentUser.get().getBasicProfile().getEmail());

    //        this.currentUser = {
    //            email: googleAuth.currentUser.get().getBasicProfile().getEmail(),
    //            name: googleAuth.currentUser.get().getBasicProfile().getEmail(),
    //            permissions: { active: data.active, admin: data.admin }
    //        }
    //        this.loading = false;
    //    }
    //}

    //@computed get isSignedIn() { return !!this.currentUser }

    //@action.bound async signIn() {


    //    let googleAuth = window.gapi.auth2.getAuthInstance();

    //    await googleAuth.signIn({
    //        scope: 'profile email'
    //    });

    //    await this.getUser();
    //}

    //@action.bound async signOut() {
    //    let googleAuth = window.gapi.auth2.getAuthInstance();
    //    this.loading = true;
    //    await googleAuth.signOut();
    //    this.currentUser = null;
    //    this.loading = false;
    //}
}