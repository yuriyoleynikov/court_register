import MobxReactForm from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";
import { store } from '../../src/store2';
import { observable } from "mobx";
import * as MyClasses from '../model/MyClasses'

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
    //},
    //{
    //    name: "name",
    //    label: "Name",
    //    placeholder: "Insert Name",
    //    rules: "required|string"
    //},
    //{
    //    name: "password",
    //    label: "Password",
    //    placeholder: "Insert Password",
    //    rules: "required|string|between:5,25"
    //},
    //{
    //    name: "passwordConfirm",
    //    label: "Password Confirmation",
    //    placeholder: "Confirm Password",
    //    rules: "required|string|same:password"
    //}
];

const hooks = {
    onSuccess(form) {
        alert("Form is valid! Send the request here.");
        // get field values

        console.log("Form Values!", form.values());
        console.log("Form Values!", form.values().password);

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

const form = new MobxReactForm({ fields }, { plugins, hooks });
window.form = form;
export default form;