import MobxReactForm from 'mobx-react-form';
import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from 'validatorjs';

import { store } from '../store';
import { User } from '../';

const plugins = {
    dvr: dvr(validatorjs)
};

const fields = [
    {
        name: "first_name",
        label: "Имя",
        placeholder: "Имя",
        rules: "required|string"
    },
    {
        name: "second_name",
        label: "Фамилия",
        placeholder: "Фамилия",
        rules: "required|string"
    },
    {
        name: "third_name",
        label: "Отчество",
        placeholder: "Отчество",
        rules: "string"
    },
    {
        name: "email",
        label: "E-mail",
        placeholder: "E-mail",
        rules: "required|string"
    },
    {
        name: "active",
        label: "Активен",
        placeholder: "Активен",
        rules: "boolean"
    },
    {
        name: "admin",
        label: "Администратор",
        placeholder: "Администратор",
        rules: "boolean"
    },
    {
        name: "unitAdmin",
        label: "Администратор подразделений",
        placeholder: "Администратор подразделений",
        rules: "boolean"
    }
];

const hooks = {
    async onSuccess(form) {
        let newUser = new User();

        newUser = await store.admin.getUserByEmail(form.values().email);
        console.log(form);

        newUser.first_name = form.values().first_name;
        newUser.second_name = form.values().second_name;
        newUser.third_name = form.values().third_name;
        newUser.active = form.values().active;
        newUser.permission.admin = form.values().admin;

        store.admin.changeUserByEmail(form.values().email, newUser);
    },
    onError(form) {
        alert("Form has errors!");
        // get all form errors
        console.log("All form errors", form.errors());
    }
};

//export function createUserForm(user) {
//    const form = new MobxReactForm({ fields }, { plugins, hooks: {
//        onSuccess(form) {
//            user.first_name = form.values().first_name;
//            user.second_name = form.values().second_name;
//            user.third_name = form.values().third_name;
//        }
//    },
//    onError(form) {
//        alert("Form has errors!");
//        // get all form errors
//        console.log("All form errors", form.errors());
//        }
//    });

//    form.$('first_name').value = user.first_name;

//    return form;
//}

export default new MobxReactForm({ fields }, { plugins, hooks });