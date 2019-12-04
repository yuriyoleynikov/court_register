import { observable, action, computed } from "mobx"
import * as MyClasses from "./MyClasses";

declare var window: any;

export class CaseStore {
    @observable cases: MyClasses.Case[] | null = null;
    @observable loading = false;
    @observable filter1: string | null = null;
    @observable filter2: string | null = null;

    @action.bound async loadCases(filter1: string | null, filter2: string | null) {
        this.loading = true;
        let response = await fetch(`api/cases/?filter1=${filter1}&filter2=${filter2}`, {
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
            }
        });

        this.cases = await response.json();
        this.loading = false;
    }

    @action.bound async createCase(currentCase: MyClasses.Case) {
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