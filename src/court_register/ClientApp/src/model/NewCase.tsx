import { observable, action, computed } from "mobx"
import * as MyClasses from "./MyClasses";
declare var window: any;

export class NewCase {
    @observable settingsCase: MyClasses.SettingsCase = new MyClasses.SettingsCase();
    @observable loading: boolean = false;
    //@observable openCourt: boolean = true;

    //@action.bound onClickNewCort() {
    //    this.openCourt = !this.openCourt;
    //}

    @action.bound async loadSettingsCase() {
        this.loading = true;
        let response = await fetch(`api/case/settings`, {
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
            }
        });
        this.settingsCase = await response.json();
        this.loading = false;
    }
}