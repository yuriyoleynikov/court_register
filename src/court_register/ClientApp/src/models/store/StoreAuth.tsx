import { observable, action, computed } from "mobx";

import { User } from './../MyClasses';
import { store } from "./";
import { StorePage } from "./";

const GoogleApiKey = '921481274837-sfba1gv0mdatog6iobno4spdrcnofsik.apps.googleusercontent.com';

const loadAuth2 = () => {
    return new Promise<undefined>((resolve) => {
        gapi.load('auth2', () => resolve(undefined));
    })
}

const getUserPermissions = async () => {
    let response = await fetch(`api/user`, {
        credentials: 'include',
        headers: {
            Authorization: 'Bearer ' + gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
        }
    });
    let data = await response.json();
    return data;
}

export class StoreAuth {
    @observable user: User | null = null;
    @observable loading = false;
    @observable downloadedAuth2 = false;

    @action.bound async loadAuth2() {
        if (this.downloadedAuth2)
            return;
        await loadAuth2();
        const auth = gapi.auth2.init({
            client_id: GoogleApiKey
        });
        await new Promise<undefined>(resolve => { auth.then(() => resolve()) });
        this.downloadedAuth2 = true;

        auth.currentUser.listen(u => {
            this.getUser();
        })

        await this.getUser();
    }

    @action.bound async getUser() {
        let googleAuth = gapi.auth2.getAuthInstance();
        if (googleAuth.isSignedIn.get()) {
            this.loading = true;
            let data = await getUserPermissions();
            this.user = data.current;
            this.loading = false;
        }
    }

    @computed get isSignedIn() { return !!this.user }

    @action.bound async signIn() {
        let googleAuth = gapi.auth2.getAuthInstance();
        await googleAuth.signIn({
            scope: 'profile email'
        });
        await this.getUser();
    }

    @action.bound async signOut() {
        let googleAuth = gapi.auth2.getAuthInstance();
        this.loading = true;
        await googleAuth.signOut();

        store.auth.user = null;
        store.auth.loading = false;
        store.auth.downloadedAuth2 = true;

        store.page = new StorePage();
    }
}
