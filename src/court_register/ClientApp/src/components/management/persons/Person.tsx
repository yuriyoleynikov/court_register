import * as React from 'react';
import { Person } from '../../../models';
import { store } from '../../../models/store';
import { observer } from 'mobx-react';
import PersonContainer from './PersonContainer';
import formPerson from '../../../models/forms/formPerson';

type PersonComponentProps = {
    _id: string | null;
    person: Person | null;
    loading: boolean;
    loadPersonById(id: string | null): void;
}

const PersonComponent = (props: PersonComponentProps) => {
    React.useEffect(() => { props.loadPersonById(props._id); }, [])

    if (!props.loading) {
        formPerson.$('_type').value = props.person && props.person._type ? props.person._type : null;
        formPerson.$('address').value = props.person && props.person.address ? props.person.address : null;

        if (props.person && props.person._type && props.person._type == 'ul') {
            formPerson.$('name').value = props.person && props.person.entity ? props.person.entity.name : null;
            formPerson.$('inn').value = props.person && props.person.entity ? props.person.entity.inn : null;
        }

        if (props.person && props.person._type && props.person._type == 'fl') {
            formPerson.$('first_name').value = props.person && props.person.individual ? props.person.individual.first_name : null;
            formPerson.$('second_name').value = props.person && props.person.individual ? props.person.individual.second_name : null;
            formPerson.$('third_name').value = props.person && props.person.individual ? props.person.individual.third_name : null;
        }

        if (props.person && props.person._type && props.person._type == 'adm') {
            formPerson.$('name').value = props.person && props.person.administration ? props.person.administration.name : null;
        }

        formPerson.$('_id').value = props._id;
    }

    if (props.loading) {
        return <></>;
    }

    return (<>
        <PersonContainer form={formPerson} />
    </>);
};

export default observer((props: { _id: string | null; }) => <PersonComponent
    _id={props._id}

    person={store.page.person.person}
    loading={store.page.person.loading}
    loadPersonById={store.page.person.loadPersonById}
/>);