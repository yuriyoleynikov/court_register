import * as React from 'react';

import CaseContainer from './CaseContainer';
import formCase from '../../models/forms/formCase';
import { observer } from 'mobx-react';
import { store } from '../../models/store';
import { SettingsCase, Case } from '../../models';

interface CaseComponentProps {
    settingsCase: SettingsCase;
    loading: boolean;
    loadSettingsCase(): void;
    _id: string | null;
    loadCaseById(id: string): void;
    currentCase: Case | null;
}

const CaseComponent = (props: CaseComponentProps) => {
    React.useEffect(() => {
        props.loadSettingsCase();
        if (props._id) {
            props.loadCaseById(props._id);
        }
        (window as any).form = formCase;
    }, []);

    if (!props.loading) {
        if (props.settingsCase.units != null) {
            let nameUnitsList = props.settingsCase.units.map(u => u.name);
            formCase.$('unit').$extra = nameUnitsList;
        }
        if (props.settingsCase.courts != null) {
            let nameCourtList = props.settingsCase.courts.map(u => u.name);
            formCase.$('court').$extra = nameCourtList;
        }
        if (props.settingsCase.type_roles != null) {
            let roleList = props.settingsCase.type_roles.map(u => u.name);
            formCase.$('type_role').$extra = roleList;
        }
        if (props.settingsCase.category != null) {
            let categoryList = props.settingsCase.category.map(u => u.name);
            formCase.$('category').$extra = categoryList;
        }
        if (props.settingsCase.executors != null) {
            let executorList = props.settingsCase.executors.map(u => u.full_name);
            formCase.$('executor').$extra = executorList;
        }
        //if (props.settingsCase.statuses != null) {
        //    let statusList = props.settingsCase.statuses.map(u => u.name);
        //    formCase.$('state').$extra = statusList;
        //}
        if (props.currentCase != null) {
            formCase.$('reg_number').value = props.currentCase.reg_number;
            //formCase.$('case_number').value = props.currentCase.case_number;
            //formCase.$('category').$value = props.currentCase.category ? props.currentCase.category.name : undefined;
            //formCase.$('type_role').value = props.currentCase.type_role ? props.currentCase.type_role.name : undefined;
            //formCase.$('court').value = props.currentCase.court ? props.currentCase.court.name : undefined;
            //formCase.$('unit').value = props.currentCase.unit ? props.currentCase.unit.name : undefined;
            //formCase.$('executor').value = props.currentCase.executor ? props.currentCase.executor.full_name : undefined;
            //formCase.$('state').value = props.currentCase.state && props.currentCase.state[0] ?
            //    props.currentCase.state[0].name : undefined;
            //formCase.$('_id').value = props._id;
        }

    }

    if (props.loading) {
        return <></>;
    }

    return (<div>
        <CaseContainer form={formCase}
            //toggle={props.toggle} isOpenStatus={props.isOpenStatus}
        />
    </div>);
};

export default observer((props: { _id: string | null; }) => <CaseComponent
    settingsCase={store.page.case.settingsCase}
    loading={store.page.case.loading}
    loadSettingsCase={store.page.case.loadSettingsCase}
    //toggle={store.court.toggle}
    //isOpenStatus={store.court.isOpenStatus}
    _id={props._id}
    loadCaseById={store.page.case.loadCaseById}
    currentCase={store.page.case.currentCase}
/>);