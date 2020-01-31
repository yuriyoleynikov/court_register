import * as React from 'react';
import { observer } from 'mobx-react';
import { Link, NavLink } from 'react-router-dom';

import { store } from '../../../models/store'
import { Unit } from '../../../models';
import Loading from '../../../components/Loading';


type UnitsProps = {
    units: Unit[] | null;
    loading: boolean;
    loadUnits(): void;
}

const Units = (props: UnitsProps) => {
    React.useEffect(() => { props.loadUnits(); }, [])
    
    if (props.loading) {
        return <div>
            <Loading />
        </div>;
    }

    return (
        <div>
            <NavLink className="text-dark" to="/settings/units/new">- Создать новое подразделение</NavLink>
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>_id</th>
                        <th>name</th>
                        <th>full_name</th>
                    </tr>
                </thead>
                <tbody>
                    {props.units ?
                        props.units.map((unit: Unit) =>
                            <tr key={unit._id ? unit._id : undefined}>
                                <td>{unit._id}</td>
                                <td>{unit.name}</td>
                                <td>{unit.full_name}</td>
                            </tr>
                        ) : null}
                </tbody>
            </table>
        </div>
    );
};

export default observer(() => <Units
    units={store.page.units.units}
    loading={store.page.units.loading}
    loadUnits={store.page.units.loadUnits}
/>);