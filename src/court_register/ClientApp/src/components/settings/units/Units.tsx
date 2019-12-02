import * as React from 'react';
import { observer } from 'mobx-react';

import { store } from '../../../store2'
import * as MyClasses from '../../../model/MyClasses';
import Loading from '../../../Loading';

import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

type UnitsProps = {
    units: MyClasses.Unit[] | null;
    loading: boolean;
    loadUnits(): void;
    //activateUser(email: string | null): void;
    //deactivateUser(email: string | null): void;
}

const $btn = 'f6 link dim bn br2 ph3 pv2 mr2 dib white bg-dark-blue';
const Units = (props: UnitsProps) => {
    React.useEffect(() => { props.loadUnits(); console.log('loadUnits ok'); }, [])
    
    if (props.loading) {
        return <div>
            <Loading />
        </div>;
    }
    return (
        <div>
            <NavLink tag={Link} className="text-dark" to="/settings/units/new">- Создать новое подразделение</NavLink>
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
                        props.units.map((unit: MyClasses.Unit) =>
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
    units={store.units.units}
    loading={store.units.loading}
    loadUnits={store.units.loadUnits}
/>);