import MobxReactForm from 'mobx-react-form';
import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from 'validatorjs';
import { store } from '../store';
import { Court } from '../';

const plugins = {
    dvr: dvr(validatorjs)
};

const fields = [
    {
        name: "name",
        label: "name",
        placeholder: "name",
        rules: "required|string"
    },
    {
        name: "full_name",
        label: "full_name",
        placeholder: "full_name",
        rules: "required|string"
    },
    {
        name: "adress",
        label: "adress",
        placeholder: "adress",
        rules: "string"
    }
];

const hooks = {
    onSuccess(form) {
        let newCourt = new Court();

        newCourt.name = form.values().name;
        newCourt.full_name = form.values().full_name;
        newCourt.adress = form.values().adress;

        store.court.createNewCourt(newCourt);
        form.clear();
        store.court.isOpen = false;

        store.pageCase.loadSettingsCase();
    },
    onError(form) {
        alert("Form has errors!");
        // get all form errors
        console.log("All form errors", form.errors());
    }
};

export default new MobxReactForm({ fields }, { plugins, hooks });