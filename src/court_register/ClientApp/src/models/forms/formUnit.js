import MobxReactForm from 'mobx-react-form';
import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from "validatorjs";
import { store } from '../store';
import { Unit } from '../';

const plugins = {
    dvr: dvr(validatorjs)
};

const fields = [
    {
        name: "name",
        label: "Название",
        placeholder: "Название",
        rules: "string"
    },
    {
        name: "full_name",
        label: "Полное название",
        placeholder: "Полное название",
        rules: "string"
    },
    {
        name: "_id",
        value: undefined
    }
];

const hooks = {
    onSuccess(form) {
        let newUnit = new Unit();
        newUnit = store.page.unit.unit;
        newUnit.name = form.values().name;
        newUnit.full_name = form.values().full_name;

        store.page.unit.updateUnit(newUnit);
    },
    onError(form) {
    }
};

export default new MobxReactForm({ fields }, { plugins, hooks });