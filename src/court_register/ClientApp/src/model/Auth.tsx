import { observable, action, computed } from "mobx"
import { store } from "../store2";

declare var window: any;

export class User {
    @observable name = 'User name';
    @observable email = 'user@gmail.com';
    @observable permissions: any | null = null;
}

//function delay(ms: number) {
//    return new Promise<undefined>((resolve) => {
//        window.setTimeout(() => resolve(undefined), ms)
//    })
//}

const loadAuth2 = () => {
    return new Promise<undefined>((resolve) => {
        window.gapi.load('auth2', () => resolve(undefined));
    })
}

const getUserPermissions = async () => {
    let response = await fetch(`api/UserPermissions`, {
        credentials: 'include',
        headers: {
            Authorization: 'Bearer ' + window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
        }
    });

    let data = await response.json();
    return data;
}

export class Auth {
    @observable currentUser: User | null = null;
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

    @action.bound getUser() {
        let googleAuth = window.gapi.auth2.getAuthInstance();
        if (googleAuth.isSignedIn.get()) {
            this.loading = false;
            this.currentUser = {
                name: googleAuth.currentUser.get().getBasicProfile().getEmail(),
                email: googleAuth.currentUser.get().getBasicProfile().getEmail(),
                permissions: null
            }
        }
    }

    @computed get isSignedIn() { return !!this.currentUser }

    @action.bound async signIn() {
        //this.loading = true;
        //await delay(2000)
        //this.loading = false;
        //this.currentUser = new User();

        this.loading = true;

        let googleAuth = window.gapi.auth2.getAuthInstance();
        let response = await googleAuth.signIn({
            scope: 'profile email'
        });
        this.currentUser = {
            email: googleAuth.currentUser.get().getBasicProfile().getEmail(),
            name: googleAuth.currentUser.get().getBasicProfile().getEmail(),
            permissions: null
        }

        let data = await getUserPermissions();
        this.currentUser.permissions = data;

        //let response2 = await fetch(`api/user`, {
        //    credentials: 'include',
        //    headers: {
        //        Authorization: 'Bearer ' + window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
        //    }
        //});

        //console.log(response2);
        //let response3 = await response2.text();
        //console.log(response3);
        //if (response3 != null)
        //    this.currentUser.role = parseInt(response3);
        this.loading = false;
    }

    @action.bound async signOut() {
        this.currentUser = null;
        let googleAuth = window.gapi.auth2.getAuthInstance();
        let response = await googleAuth.signOut();
    }
}