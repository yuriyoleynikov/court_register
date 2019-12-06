import MobxReactForm from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";
import { store } from '../store2';
import { observable } from "mobx";
import * as MyClasses from './MyClasses'

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
        extra: []
    }
];

const hooks = {
    onSuccess(form) {
        let newCase = new MyClasses.Case();
        newCase.reg_number = form.values().reg_number;
        newCase.case_number = form.values().case_number;
        newCase.unit = form.values().unit;
        store.case.createCase(newCase);
    },
    onError(form) {
        alert("Form has errors!");
        // get all form errors
        console.log("All form errors", form.errors());
    }
};

const formNewCase = new MobxReactForm({ fields }, { plugins, hooks });
window.formNewCase = formNewCase;
export default formNewCase;