import { observable } from "mobx"

export class SettingsCase {
    @observable units: Unit[] | null = null;
    @observable courts: Court[] | null = null;
}

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

export class Unit {
    @observable version: number | null = null;
    @observable _id: number | null = null;

    @observable name: string | null = null;
    @observable full_name: string | null = null;

    @observable deleted: boolean | null = null;

    @observable created: Created | null = null;
}

export class Case {
    @observable version: number | null = null;
    @observable _id: number | null = null;

    @observable reg_number: string | null = null;
    @observable case_number: string | undefined = undefined;

    @observable court: Court | null = null;
    @observable type_role_case: TypeRoleCase | null = null;
    @observable case_category: CaseCategory | null = null;
    @observable unit: Unit | null = null;
    @observable executor: Executor | null = null;
    @observable state: Status[] | null = null;

    @observable deleted: boolean | null = null;

    @observable created: Created | null = null;
}

export class Court {
    @observable version: number | null = null;
    @observable _id: number | null = null;

    @observable name: string | null = null;
    @observable full_name: string | null = null;
    @observable adress: string | null = null;

    @observable deleted: boolean | null = null;

    @observable created: Created | null = null;
}

export class TypeRoleCase {
    @observable version: number | null = null;
    @observable _id: number | null = null;

    @observable name: string | null = null;
    @observable full_name: string | null = null;

    @observable deleted: boolean | null = null;

    @observable created: Created | null = null;
}

export class CaseCategory {
    @observable version: number | null = null;
    @observable _id: number | null = null;

    @observable name: string | null = null;
    @observable full_name: string | null = null;

    @observable deleted: boolean | null = null;

    @observable created: Created | null = null;
}

export class Executor {
    @observable version: number | null = null;
    @observable _id: number | null = null;

    @observable first_name: string | null = null;
    @observable second_name: string | null = null;
    @observable third_name: string | null = null;

    @observable deleted: boolean | null = null;

    @observable created: Created | null = null;
}

export class Status {
    @observable version: number | null = null;
    @observable _id: number | null = null;

    @observable name: string | null = null;
    @observable short_sign: string | null = null;

    @observable deleted: boolean | null = null;

    @observable created: Created | null = null;
}