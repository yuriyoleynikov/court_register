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
        name: "first_name",
        label: "first_name",
        placeholder: "first_name",
        rules: "required|string"
    },
    {
        name: "second_name",
        label: "second_name",
        placeholder: "second_name",
        rules: "required|string"
    },
    {
        name: "third_name",
        label: "third_name",
        placeholder: "third_name",
        rules: "required|string"    
    }
];

const hooks = {
    onSuccess(form) {
        //alert("Form is valid! Send the request here.");

        //console.log("Form Values!", form.values());
        //console.log("Form Values!", form.values().password);

        let newUser = new MyClasses.User();

        newUser = store.auth.user;

        newUser.first_name = form.values().first_name;
        newUser.second_name = form.values().second_name;
        newUser.third_name = form.values().third_name;

        store.admin.changePersonal(newUser);
    },
    onError(form) {
        alert("Form has errors!");
        // get all form errors
        console.log("All form errors", form.errors());
    }
};

export default new MobxReactForm({ fields }, { plugins, hooks });