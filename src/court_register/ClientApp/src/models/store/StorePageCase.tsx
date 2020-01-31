import { observable, action } from 'mobx';
import { SettingsCase, Case } from '../';

declare var window: any;

export class StorePageCase {
    @observable settingsCase: SettingsCase = new SettingsCase();
    @observable loading = false;
    @observable isCreateCaseLoaded = false;
    @observable currentId: string| null = null;
    @observable currentCase: Case| null = null;

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

    @action.bound async createCase() {
        this.loading = true;
        let response = await fetch(`api/case/create`, {
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
            }
        });

        this.currentId = await response.json();
        this.loading = false;
        this.isCreateCaseLoaded = true;
    }

    @action.bound async loadCaseById(_id: string) {
        this.loading = true;
        let response = await fetch(`api/case?_id=${_id}`, {
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
            }
        });

        this.currentCase = new Case();
        let result = await response.json();
        this.currentCase = result.current;
        this.loading = false;
    }
}