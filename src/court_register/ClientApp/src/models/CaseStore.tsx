import { observable, action } from "mobx"
import { Case } from "./MyClasses";
import * as queryString from 'query-string'

declare var window: any;

export class CaseStore {
    @observable cases: Case[] | null = null;
    @observable loading = false;

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
}