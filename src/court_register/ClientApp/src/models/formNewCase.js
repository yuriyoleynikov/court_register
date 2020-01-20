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

        newCase.unit = store.new_case.settingsCase.units.find(u => u.name == form.values().unit);
        newCase.court = store.new_case.settingsCase.courts.find(u => u.name == form.values().court);
        newCase.type_role = store.new_case.settingsCase.type_roles.find(u => u.name == form.values().type_role);
        newCase.category = store.new_case.settingsCase.category.find(u => u.name == form.values().category);
        newCase.state = [store.new_case.settingsCase.statuses.find(u => u.name == form.values().state)];
        newCase.executor = store.new_case.settingsCase.executors.find(u => u.full_name == form.values().executor);

        store.case.createCase(newCase);
    },
    onError(form) {
        alert("Form has errors!");
        // get all form errors
        console.log("All form errors", form.errors());
    }
};

export default new MobxReactForm({ fields }, { plugins, hooks });