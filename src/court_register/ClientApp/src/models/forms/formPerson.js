import MobxReactForm from 'mobx-react-form';
import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from 'validatorjs';
import { store } from '../store';
import { Person, Entity, Individual, Administration } from '../';

const plugins = {
    dvr: dvr(validatorjs)
};

const fields = [
    {
        name: "_id",
        value: undefined
    },
    {
        name: "_type",
        label: "Тип",
        placeholder: "Тип",
        rules: "string"
    },
    {
        name: "address",
        label: "Адрес",
        placeholder: "Адрес",
        rules: "string"
    },
    {
        name: "first_name",
        label: "Имя",
        placeholder: "Имя",
        rules: "string"
    },
    {
        name: "second_name",
        label: "Фамилия",
        placeholder: "Фамилия",
        rules: "string"
    },
    {
        name: "third_name",
        label: "Отчество",
        placeholder: "Отчество",
        rules: "string"
    },
    {
        name: "inn",
        label: "ИНН",
        placeholder: "ИНН",
        rules: "string"
    },
    {
        name: "name",
        label: "Название",
        placeholder: "Название",
        rules: "string"
    }    
];

const hooks = {
    onSuccess(form) {
        let newPerson = new Person();
        newPerson = store.page.person.person;
        newPerson.address = form.values().address;

        if (form.values()._type == 'ul') {
            newPerson.entity = new Entity();
            newPerson.entity.name = form.values().name;
            newPerson.entity.inn = form.values().inn;
        }
        if (form.values()._type == 'fl') {
            newPerson.individual = new Individual();
            newPerson.individual.first_name = form.values().first_name;
            newPerson.individual.second_name = form.values().second_name;
            newPerson.individual.third_name = form.values().third_name;
        }
        if (form.values()._type == 'adm') {
            newPerson.administration = new Administration();
            newPerson.administration.name = form.values().name;
        }

        store.page.person.updatePerson(newPerson);
    },
    onError(form) {
        alert("Form has errors!");
        // get all form errors
        console.log("All form errors", form.errors());
    }
};

export default new MobxReactForm({ fields }, { plugins, hooks });