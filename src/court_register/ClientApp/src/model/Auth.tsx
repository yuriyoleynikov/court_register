import { observable, action, computed } from "mobx"

export class User {
    @observable name = 'User name'
    @observable email = 'user@aol.com'
}

function delay(ms: number) {
    return new Promise<undefined>((resolve) => {
        window.setTimeout(() => resolve(undefined), ms)
    })
}

export class Auth {
    @observable currentUser: User | null = null;
    @observable loading = false;

    @computed get isSignedIn() { return !!this.currentUser }

    @action.bound async signIn() {
        this.loading = true;
        await delay(2000)
        this.loading = false;
        this.currentUser = new User();
    }

    @action.bound signOut() {
        this.currentUser = null;
    }
}