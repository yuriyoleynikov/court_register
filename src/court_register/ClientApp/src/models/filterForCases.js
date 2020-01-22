import MobxReactForm from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";
import { store } from './../store';
import { Case, Status } from './MyClasses'

const plugins = {
    dvr: dvr(validatorjs)
};

const fields = [
    {
        name: "reg_number",
        label: "Регистрационный номер",
        placeholder: "Регистрационный номер",
        rules: "string"
    },
    {
        name: "case_number",
        label: "Номер дела",
        placeholder: "Номер дела",
        rules: "string"
    },
    {
        name: "unit",
        label: "Подразделение",
        placeholder: "Подразделение",
        value: undefined,
        extra: []
    },
    {
        name: "court",
        label: "Суд",
        placeholder: "Суд",
        value: undefined,
        extra: []
    },
    {
        name: "type_role",
        label: "Роль",
        placeholder: "Роль",
        value: undefined,
        extra: []
    },
    {
        name: "category",
        label: "Категория",
        placeholder: "Категория",
        value: undefined,
        extra: []
    },
    {
        name: "executor",
        label: "Исполнитель",
        placeholder: "Исполнитель",
        value: undefined,
        extra: []
    },
    {
        name: "state",
        label: "Состояние",
        placeholder: "Состояние",
        value: undefined,
        extra: []
    }
];

const hooks = {
    onSuccess(filter) {
        window.history.pushState(null, null, `/?reg_number=${filter.values().reg_number}`);
    },
    onChange(filter) {
        window.history.state.search = `?reg_number=${filter.values().reg_number}`;
    }
};

export default new MobxReactForm({ fields }, { plugins, hooks });