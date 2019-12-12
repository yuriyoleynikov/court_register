import MobxReactForm from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";
import { store } from './../store';
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
    },
    {
        name: "court",
        label: "court",
        placeholder: "court",
        extra: []
    }
];

const hooks = {
    onSuccess(form) {
        let newCase = new MyClasses.Case();
        newCase.reg_number = form.values().reg_number;
        newCase.case_number = form.values().case_number;
        newCase.unit = store.new_case.settingsCase.units.find(u => u.name == form.values().unit);
        newCase.court = store.new_case.settingsCase.courts.find(u => u.name == form.values().court);


        form.values().reg_number = null;
        form.values().case_number = null;
        form.values().unit = null;
        form.values().court = null;


        store.case.createCase(newCase);        
    },
    onError(form) {
        alert("Form has errors!");
        // get all form errors
        console.log("All form errors", form.errors());
    }
};

export default new MobxReactForm({ fields }, { plugins, hooks });