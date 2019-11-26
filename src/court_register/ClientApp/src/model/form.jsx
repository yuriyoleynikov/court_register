import MobxReactForm from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";
import { store } from '../store2'
import { observable } from "mobx";

const plugins = {
    dvr: dvr(validatorjs)
};

const fields = [
    {
        name: "email",
        label: "Email",
        placeholder: "Insert Email",
        rules: "required|email|string|between:5,25"
    },
    {
        name: "name",
        label: "Name",
        placeholder: "Insert Name",
        rules: "required|string"
    },
    {
        name: "password",
        label: "Password",
        placeholder: "Insert Password",
        rules: "required|string|between:5,25"
    },
    {
        name: "passwordConfirm",
        label: "Password Confirmation",
        placeholder: "Confirm Password",
        rules: "required|string|same:password"
    }
];

const hooks = {
    onSuccess(form) {
        alert("Form is valid! Send the request here.");
        // get field values
        console.log("Form Values!", form.values());
        console.log("Form Values!", form.values().password);
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