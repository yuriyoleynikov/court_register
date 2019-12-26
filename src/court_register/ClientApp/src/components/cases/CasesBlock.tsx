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
                        props.cases.map((currentCase: Case, index: number = 1) =>
                            <tr key={currentCase._id ? currentCase._id : 0}>
                                <td>{index++}</td>
                                <td>{currentCase.reg_number}</td>
                                <td>{currentCase.court ? currentCase.court.name : null}</td>
                                <td>{currentCase.case_number}</td>
                                <td>{currentCase.type_role ? currentCase.type_role.name : null}</td>
                                <td>{currentCase.category ? currentCase.category.name : null}</td>                                
                                <td>{currentCase.unit ? currentCase.unit.name : null}</td>
                                <td>{currentCase.executor ? currentCase.executor.full_name : null}</td>
                                <td>{currentCase.state ? currentCase.state.length : null}</td>
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
/>);