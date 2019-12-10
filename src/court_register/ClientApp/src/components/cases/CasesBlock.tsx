import * as React from 'react';
import { observer } from 'mobx-react';

import { store } from '../../store2';
import * as MyClasses from '../../model/MyClasses';
import Loading from '../../Loading';
import NotCases from './NotCases';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

type CasesProps = {
    cases: MyClasses.Case[] | null;
    loading: boolean;
    loadCases(): void;
    addCase(newCase: MyClasses.Case): void;
}

const $btn = 'f6 link dim bn br2 ph3 pv2 mr2 dib white bg-dark-blue';

const Cases = (props: CasesProps) => {
    React.useEffect(() => { props.loadCases() }, [])
    //const showUser = (email: string | null) => {
    //    console.log('showUser ok ' + email);
    //}
    if (props.loading) {
        return <div>
            <Loading />
        </div>;
    }
    return (
        <div>
            <NavLink tag={Link} className={$btn} to="/case">Добавить дело</NavLink>
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>№ Рег.</th>
                        <th>Суд</th>
                        <th>№ Дела</th>
                        <th>Администрация</th>
                        <th>Категория</th>
                        <th>Ответственный</th>
                        <th>Исполнитель</th>
                        <th>Состояние</th>
                    </tr>
                </thead>
                <tbody>
                    {props.cases ?
                        props.cases.map((user: MyClasses.Case, index: number = 1) =>
                            <tr key={user._id ? user._id : 0}>
                                <td>{index++}</td>
                                <td>{user.reg_number}</td>                                
                                <td>{user.court}</td>
                                <td>{user.case_number}</td>
                                <td>{user.case_category ? user.case_category.name : null}</td>
                                <td>{user.type_role_case ? user.type_role_case.name : null}</td>
                                <td>{user.unit ? user.unit.name : null}</td>
                                <td>{user.executor ? user.executor.first_name : null}</td>
                                <td>{user.state ? user.state.length : null}</td>
                            </tr>
                        ) : null}
                </tbody>
            </table>
            {props.cases ?
                props.cases.length == 0 ?
                    <NotCases /> : null : <NotCases />}
        </div>
    );
};

export default observer(() => <Cases
    cases={store.case.cases}
    loading={store.case.loading}
    loadCases={store.case.loadCases}
    addCase={store.case.createCase}
/>);