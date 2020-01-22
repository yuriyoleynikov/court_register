import { observable, action } from "mobx"
import { Case, SettingsCase } from "./MyClasses";
import * as queryString from 'query-string'

declare var window: any;

class FilterForCases {
    @observable unit: string | null = null;
    @observable court: string | null = null;
    @observable type_role: string | null = null;
    @observable category: string | null = null;
    @observable status: string | null = null;
    @observable executor: string | null = null;
    @observable reg_number: string | null = null;
}

export class CaseStore {
    @observable cases: Case[] | null = null;
    @observable loading = false;    
    @observable currentSettingsCase: FilterForCases = new FilterForCases();
    @observable settingsCase: SettingsCase = new SettingsCase();

    @action.bound async loadCases() {
        this.loading = true;
        let parsed = queryString.parse(window.location.search);
        let url = Object.keys(parsed).length == 0 ? `api/cases` : `api/cases?${queryString.stringify(parsed)}`;

        let response = await fetch(url, {
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
            }
        });
        this.cases = await response.json();
        this.loading = false;
    }

    @action.bound async createCase(currentCase: Case) {
        this.loading = true;
        let response = await fetch(`api/case`, {
            method: 'POST',
            body: JSON.stringify(currentCase),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
            }
        });

        await response.json();
        this.loading = false;
    }

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