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
        label: "Название",
        placeholder: "Название",
        rules: "required|string"
    },
    {
        name: "full_name",
        label: "Полное название",
        placeholder: "Полное название",
        rules: "string"
    },
    {
        name: "address",
        label: "Адрес",
        placeholder: "Адрес",
        rules: "string"
    },
    {
        name: "_id",
        value: undefined
    }
];

const hooks = {
    onSuccess(form) {
        let newCourt = new Court();
        newCourt = store.page.court.court;
        newCourt.name = form.values().name;
        newCourt.full_name = form.values().full_name;
        newCourt.address = form.values().address;

        store.page.court.updateCourt(newCourt);
    },
    onError(form) {
        alert("Form has errors!");
        // get all form errors
        console.log("All form errors", form.errors());
    }
};

export default new MobxReactForm({ fields }, { plugins, hooks });