import { observable, action, computed } from "mobx"
import { store } from "../store2";
import { User } from "./Auth";

declare var window: any;

//export class User {
//    @observable name = '';
//    @observable email = '';
//    @observable permissions: any | null = null;
//}

//const loadAuth2 = () => {
//    return new Promise<undefined>((resolve) => {
//        window.gapi.load('auth2', () => resolve(undefined));
//    })
//}

//const getUserPermissions = async (email:any) => {
//    let response = await fetch(email != null ? `api/UserPermissions/{email}` : `api/UserPermissions`, {
//        credentials: 'include',
//        headers: {
//            Authorization: 'Bearer ' + window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
//        }
//    });

//    let data = await response.json();
//    return data;
//}

export class Admin {
    @observable users: User[] | null = null;
    @observable loading = false;

    @action.bound async loadUsers() {
        this.loading = true;
        let response = await fetch(`api/user/getuserlist`, {
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