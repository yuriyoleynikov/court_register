import { observable } from "mobx"

export class User {
    @observable version: number | null = null;
    @observable _id: number | null = null;
    @observable email: string | null = null;

    @observable first_name: string | null = null;
    @observable second_name: string | null = null;
    @observable third_name: string | null = null;

    @observable active: boolean | null = null;

    @observable permission: Permission | null = null;
    @observable created: Created | null = null;
}

export class Permission {
    @observable admin: boolean | null = null;

    @observable roles: Role[] | null = null;
}

export class Role {
    @observable test_fild: string | null = null;
}

export class Created {
    @observable userInfo: UserInfo | null = null;
    @observable date: Date | null = null;
}

export class UserInfo {
    @observable version: number | null = null;
    @observable _id: number | null = null;
    @observable email: string | null = null;

    @observable first_name: string | null = null;
    @observable second_name: string | null = null;
    @observable third_name: string | null = null;

    @observable permission: Permission | null = null;
}