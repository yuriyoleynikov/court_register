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
        rules: "required|string"
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
    onSuccess(form) {
        let newCase = new Case();

        newCase.reg_number = form.values().reg_number;
        newCase.case_number = form.values().case_number;

        newCase.unit = store.case_edit.settingsCase.units.find(u => u.name == form.values().unit);
        newCase.court = store.case_edit.settingsCase.courts.find(u => u.name == form.values().court);
        newCase.type_role = store.case_edit.settingsCase.type_roles.find(u => u.name == form.values().type_role);
        newCase.category = store.case_edit.settingsCase.category.find(u => u.name == form.values().category);
        newCase.state = [store.case_edit.settingsCase.statuses.find(u => u.name == form.values().state)];
        newCase.executor = store.case_edit.settingsCase.executors.find(u => u.full_name == form.values().executor);

        store.cases.createCase(newCase);
    },
    onError(form) {
        alert("Form has errors!");
        // get all form errors
        console.log("All form errors", form.errors());
    }
};

export default new MobxReactForm({ fields }, { plugins, hooks });