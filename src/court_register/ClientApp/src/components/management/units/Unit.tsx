import * as React from 'react';
import { Unit } from '../../../models';
import { store } from '../../../models/store';
import { observer } from 'mobx-react';
import UnitContainer from './UnitContainer';
import formUnit from '../../../models/forms/formUnit';

type UnitComponentProps = {
    _id: string | null;
    unit: Unit | null;
    loading: boolean;
    loadUnitById(id: string | null): void;
}

const UnitComponent = (props: UnitComponentProps) => {
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
        <UnitContainer form={formUnit} />
    </>);
};

export default observer((props: { _id: string | null; }) => <UnitComponent
    _id={props._id}

    unit={store.page.unit.unit}
    loading={store.page.unit.loading}
    loadUnitById={store.page.unit.loadUnitById}
/>);