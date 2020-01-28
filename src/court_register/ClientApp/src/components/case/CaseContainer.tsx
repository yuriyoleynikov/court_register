import * as React from 'react';

import NewCase from './NewCase';
import formNewCase from '../../models/formNewCase';
import { observer } from 'mobx-react';
import { store } from '../../store';
import { SettingsCase, Case } from '../../models/MyClasses';

interface NewCaseContainerProps {
    settingsCase: SettingsCase;
    loading: boolean;
    loadSettingsCase(): void;
    isOpenStatus: boolean;
    toggle(): void;
    _id: string | null;
    loadCaseById(id: string): void;
    currentCase: Case | null;
}

const CaseContainer = (props: NewCaseContainerProps) => {
    React.useEffect(() => {
        props.loadSettingsCase();
        if (props._id) {
            props.loadCaseById(props._id);
        }
        (window as any).form = formNewCase;
    }, []);

    if (!props.loading) {
        if (props.settingsCase.units != null) {
            let nameUnitsList = props.settingsCase.units.map(u => u.name);
            formNewCase.$('unit').$extra = nameUnitsList;
        }
        if (props.settingsCase.courts != null) {
            let nameCourtList = props.settingsCase.courts.map(u => u.name);
            formNewCase.$('court').$extra = nameCourtList;
        }
        if (props.settingsCase.type_roles != null) {
            let roleList = props.settingsCase.type_roles.map(u => u.name);
            formNewCase.$('type_role').$extra = roleList;
        }
        if (props.settingsCase.category != null) {
            let categoryList = props.settingsCase.category.map(u => u.name);
            formNewCase.$('category').$extra = categoryList;
        }
        if (props.settingsCase.executors != null) {
            let executorList = props.settingsCase.executors.map(u => u.full_name);
            formNewCase.$('executor').$extra = executorList;
        }
        if (props.settingsCase.statuses != null) {
            let statusList = props.settingsCase.statuses.map(u => u.name);
            formNewCase.$('state').$extra = statusList;
        }
        if (props.currentCase != null) {
            formNewCase.$('reg_number').value = props.currentCase.reg_number;
            formNewCase.$('case_number').value = props.currentCase.case_number;
            formNewCase.$('category').$value = props.currentCase.category ? props.currentCase.category.name : undefined;
            formNewCase.$('type_role').value = props.currentCase.type_role ? props.currentCase.type_role.name : undefined;
            formNewCase.$('court').value = props.currentCase.court ? props.currentCase.court.name : undefined;
            formNewCase.$('unit').value = props.currentCase.unit ? props.currentCase.unit.name : undefined;
            formNewCase.$('executor').value = props.currentCase.executor ? props.currentCase.executor.full_name : undefined;
            formNewCase.$('state').value = props.currentCase.state ? props.currentCase.state[0].name : undefined;
            formNewCase.$('_id').value = props._id;
        }

    }

    if (props.loading) {
        return <></>;
    }

    return (<div>
        <NewCase form={formNewCase} toggle={props.toggle} isOpenStatus={props.isOpenStatus} />
    </div>);
};

export default observer((props: { _id: string | null; }) => <CaseContainer
    settingsCase={store.case_edit.settingsCase}
    loading={store.case_edit.loading}
    loadSettingsCase={store.case_edit.loadSettingsCase}
    toggle={store.court.toggle}
    isOpenStatus={store.court.isOpenStatus}
    _id={props._id}
    loadCaseById={store.case_edit.loadCaseById}
    currentCase={store.case_edit.currentCase}
/>);