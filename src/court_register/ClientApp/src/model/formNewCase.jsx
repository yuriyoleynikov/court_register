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
    }
];

const hooks = {
    onSuccess(form) {
        let newCase = new MyClasses.Case();
        newCase.reg_number = form.values().reg_number;
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