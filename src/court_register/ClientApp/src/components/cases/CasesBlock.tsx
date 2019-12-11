import * as React from 'react';
import { observer } from 'mobx-react';
import { NavLink } from 'react-router-dom';

import { store } from '../../store';
import { Case } from '../../models/MyClasses';
import Loading from '../../components/Loading';
import NotCases from './NotCases';

type CasesProps = {
    cases: Case[] | null;
    loading: boolean;
    loadCases(): void;
    addCase(newCase: Case): void;
}

const Cases = (props: CasesProps) => {
    React.useEffect(() => {
        props.loadCases()
    }, [])

    if (props.loading) {
        return <Loading />;
    }
    return (
        <div>
            <NavLink to="/case">Добавить дело</NavLink>
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
                        props.cases.map((user: Case, index: number = 1) =>
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