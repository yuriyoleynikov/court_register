import MobxReactForm from 'mobx-react-form';
import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from 'validatorjs';
import { store } from '../store';
import { Case } from '../';

const plugins = {
    dvr: dvr(validatorjs)
};
const fields2 = [
    'club.name',
    'club.city',
    'members',
    'members[].firstname',
    'members[].lastname',
    'members[].hobbies',
    'members[].hobbies[]',
];
const fields = [
    {
        name: "reg_number",
        label: "Регистрационный номер",
        placeholder: "Регистрационный номер",
        rules: "required|string"
    },
    {
        name: "unit",
        label: "Подразделение",
        placeholder: "Подразделение",
        value: undefined,
        extra: []
    },
    {
        name: "type_role",
        label: "Роль",
        placeholder: "Роль",
        value: undefined,
        extra: []
    },
    {
        name: "category",
        label: "Категория",
        placeholder: "Категория",
        value: undefined,
        extra: []
    },
    {
        name: "executor",
        label: "Исполнитель",
        placeholder: "Исполнитель",
        value: undefined,
        extra: []
    },
    {
        name: "sides"
    },
    {
        name: "sides.plaintiffs"
    },
    {
        name: "sides.plaintiffs[]._type",
        label: "Тип",
        placeholder: "Тип"
    },
    {
        name: "sides.plaintiffs[]._id"
    },
    {
        name: "sides.plaintiffs[]._name"
    },
    {
        name: "sides.defendants"
    },
    {
        name: "sides.defendants[]._type"
    },
    {
        name: "sides.defendants[]._id"
    },
    {
        name: "sides.defendants[]._name"
    },
    {
        name: "sides.third_sides"
    },
    {
        name: "sides.third_sides[]._type"
    },
    {
        name: "sides.third_sides[]._id"
    },
    {
        name: "sides.third_sides[]._name"
    },
    {
        name: "case_move"
    },    
    {
        name: "case_move[].round",
        label: "Инстанция",
        placeholder: "Инстанция",
        value: undefined,
    },
    {
        name: "case_move[].case_number",
        label: "Номер дела",
        placeholder: "Номер дела",
        value: undefined
    },
    {
        name: "case_move[].court",
        label: "Суд",
        placeholder: "Суд",
        value: undefined,
        extra: []
    },
    {
        name: "_id",
        value: undefined
    }
];

const hooks = {
    onSuccess(form) {
        let newCase = new Case();

        newCase.reg_number = form.values().reg_number;
        //newCase.case_number = form.values().case_number;

        newCase.unit = store.page.case.settingsCase.units.find(u => u.name == form.values().unit);
        newCase.type_role = store.page.case.settingsCase.type_roles.find(u => u.name == form.values().type_role);
        newCase.category = store.page.case.settingsCase.category.find(u => u.name == form.values().category);
        newCase.executor = store.page.case.settingsCase.executors.find(u => u.full_name == form.values().executor);
        newCase._id = Number(form.values()._id);
        store.page.cases.editCase(newCase);
    },
    onError(form) {
        alert("Form has errors!");
        // get all form errors
        console.log("All form errors", form.errors());
    }
};

export default new MobxReactForm({ fields }, { plugins, hooks });