import * as React from 'react';
import { Unit } from '../../../models';
import { store } from '../../../models/store';
import { observer } from 'mobx-react';
import ComponentUnit from './ComponentUnit';
import formUnit from '../../../models/forms/formUnit';

type UnitProps = {
    unit: Unit | null;
    loading: boolean;
    _id: string | null;
    loadUnitById(id: string | null): void;
}

const UnitComponent = (props: UnitProps) => {
    React.useEffect(() => { props.loadUnitById(props._id); }, [])
    
    if (!props.loading) {
        formUnit.$('name').value = props.unit && props.unit.name ? props.unit.name : null;
        formUnit.$('full_name').value = props.unit && props.unit.full_name ? props.unit.full_name : null;
        formUnit.$('_id').value = props._id;
    }

    if (props.loading) {
        return <></>;
    }

    return (<>
        <ComponentUnit form={formUnit} />
    </>);
};

export default observer((props: { _id: string | null; }) => <UnitComponent
    unit={store.page.unit.unit}
    loading={store.page.unit.loading}
    loadUnitById={store.page.unit.loadUnitById}
    _id={props._id}
/>);