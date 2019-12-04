import { observable, action, computed } from "mobx"
import * as MyClasses from "./MyClasses";

declare var window: any;

export class UnitStore {
    @observable units: MyClasses.Unit[] | null = null;
    @observable loading = false;

    @action.bound async loadUnits() {
        this.loading = true;
        let response = await fetch(`api/units`, {
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
            }
        });

        this.units = await response.json();
        this.loading = false;
    }

    @action.bound async createUnit(unit: MyClasses.Unit) {
        this.loading = true;

        let response = await fetch(`api/unit`, {
            method: 'POST',
            body: JSON.stringify(unit),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
            }
        });

        await response.json();
        this.loading = false;
    }

    //@action.bound async activateUser(email: string) {
    //    this.loading = true;
    //    let response = await fetch(`api/user/activate/${email}`, {
    //        credentials: 'include',
    //        headers: {
    //            Authorization: 'Bearer ' + window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
    //        }
    //    });

    //    await response.json();
    //    this.loadUsers();
    //    this.loading = false;
    //}

    //@action.bound async deactivateUser(email: string) {
    //    this.loading = true;
    //    let response = await fetch(`api/user/deactivate/${email}`, {
    //        credentials: 'include',
    //        headers: {
    //            Authorization: 'Bearer ' + window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
    //        }
    //    });

    //    await response.json();
    //    this.loadUsers();
    //    this.loading = false;
    //}
}