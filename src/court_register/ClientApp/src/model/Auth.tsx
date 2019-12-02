import { observable, action, computed } from "mobx";
import * as MyClasses from './MyClasses';
declare var window: any;

const loadAuth2 = () => {
    return new Promise<undefined>((resolve) => {
        window.gapi.load('auth2', () => resolve(undefined));
    })
}

const getUserPermissions = async () => {
    let response = await fetch(`api/user`, {
        credentials: 'include',
        headers: {
            Authorization: 'Bearer ' + window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
        }
    });

    let data = await response.json();
    return data;
}

export class Auth {
    @observable user: MyClasses.User | null = null;
    @observable loading = false;
    @observable downloadedAuth2 = false;

    @action.bound async loadAuth2() {
        if (this.downloadedAuth2)
            return;

        await loadAuth2();

        await window.gapi.auth2.init({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID
        });

        console.log('init ok');
        this.downloadedAuth2 = true;
        this.getUser();
    }

    @action.bound async getUser() {
        let googleAuth = window.gapi.auth2.getAuthInstance();
        if (googleAuth.isSignedIn.get()) {
            this.loading = true;
            let data = await getUserPermissions();
            this.user = data.current;
            this.loading = false;
        }
    }

    @computed get isSignedIn() { return !!this.user }

    @action.bound async signIn() {


        let googleAuth = window.gapi.auth2.getAuthInstance();

        await googleAuth.signIn({
            scope: 'profile email'
        });

        await this.getUser();
    }

    @action.bound async signOut() {
        let googleAuth = window.gapi.auth2.getAuthInstance();
        this.loading = true;
        await googleAuth.signOut();
        this.user = null;
        this.loading = false;
    }
}