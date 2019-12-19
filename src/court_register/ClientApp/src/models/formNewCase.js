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
        label: "reg_number",
        placeholder: "reg_number",
        rules: "required|string"
    },
    {
        name: "case_number",
        label: "case_number",
        placeholder: "case_number",
        rules: "string"
    },
    {
        name: "unit",
        label: "unit",
        placeholder: "unit",
        value: null,
        extra: []
    },
    {
        name: "court",
        label: "court",
        placeholder: "court",
        value: null,
        extra: []
    },
    {
        name: "type_role",
        label: "type_role",
        placeholder: "type_role",
        value: null,
        extra: []
    },
    {
        name: "category",
        label: "category",
        placeholder: "category",
        value: null,
        extra: []
    },
    {
        name: "executor",
        label: "executor",
        placeholder: "executor",
        value: null,
        extra: []
    },
    {
        name: "state",
        label: "state",
        placeholder: "state",
        value: null,
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