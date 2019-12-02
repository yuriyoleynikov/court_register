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
        name: "name",
        label: "Name",
        placeholder: "Insert Name",
        rules: "required|string"
    },
    {
        name: "full_name",
        label: "full_name",
        placeholder: "full_name",
        rules: "required|string"
    }
];

const hooks = {
    onSuccess(form) {
        //alert("Form is valid! Send the request here.");

        //console.log("Form Values!", form.values());
        //console.log("Form Values!", form.values().password);

        let newUnit = new MyClasses.Unit();

        newUnit.name = form.values().name;
        newUnit.full_name = form.values().full_name;

        store.units.createUnit(newUnit);
    },
    onError(form) {
        alert("Form has errors!");
        // get all form errors
        console.log("All form errors", form.errors());
    }
};

const formUnit = new MobxReactForm({ fields }, { plugins, hooks });
window.formUnit = formUnit;
export default formUnit;