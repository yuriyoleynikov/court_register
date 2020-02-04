import { observable } from 'mobx';
import { useLocation } from 'react-router';

export const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

export class SettingsCase {
    @observable units: Unit[] | null = null;
    @observable courts: Court[] | null = null;
    @observable type_roles: TypeRoleCase[] | null = null;
    @observable category: Category[] | null = null;
    @observable statuses: Status[] | null = null;
    @observable executors: Executor[] | null = null;
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
    @observable _id: number | null = null;
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
    
    @observable sides: Sides | null = null;

    @observable case_move: CaseMove[] | null = null;
    @observable type_role: TypeRoleCase | null = null;
    @observable category: Category | null = null;
    @observable unit: Unit | null = null;
    @observable executor: Executor | null = null;
    
    @observable deleted: boolean | null = null;

    @observable created: Created | null = null;
}

export class Sides {
    @observable plaintiff: Person | null = null;
    @observable defendant: Person | null = null;
    @observable third_side: Person | null = null;
}

export class Person {
    @observable _id: number | null = null;
    @observable version: number | null = null;
    @observable _type: string | null = null;
    @observable address: string | null = null;

    @observable individual: Individual | null = null;
    @observable entity: Entity | null = null;
    @observable administration: Administration | null = null;

    @observable deleted: boolean | null = null;
    @observable created: Created | null = null;
}

export class Individual {
    @observable first_name: string | null = null;
    @observable second_name: string | null = null;
    @observable third_name: string | null = null;
}

export class Entity {
    @observable inn: string | null = null;
    @observable name: string | null = null;
}

export class Administration {
    @observable name: string | null = null;
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

export class Category {
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
    @observable full_name: string | null = null;

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

export class CaseMove {
    @observable round: number | null = null;
    @observable case_number: string | undefined = undefined;
    @observable court: Court | null = null;
    @observable state: Status | null = null;
    @observable date: Date | null = null;
    @observable documents: TextDocument[] | null = null;
}

export class TextDocument {
    @observable name: string | null = null;
    @observable num: number | null = null;
    @observable text: string | null = null;
}