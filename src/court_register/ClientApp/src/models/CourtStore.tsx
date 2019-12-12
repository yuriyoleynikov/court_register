import { observable, action, computed } from "mobx"
import { Court } from "./MyClasses";

declare var window: any;

export class CourtStore {
    @observable isOpen: boolean = false;
    @observable loading: boolean = false;

    @action.bound toggle() {
        this.isOpen = !this.isOpen;
    }

    @computed get isOpenStatus() { return this.isOpen }

    @action.bound async createNewCourt(currentCourt: Court) {
        this.loading = true;
        let response = await fetch(`api/court`, {
            method: 'POST',
            body: JSON.stringify(currentCourt),
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