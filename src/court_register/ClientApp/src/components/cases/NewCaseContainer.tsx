import * as React from 'react';

import NewCase from './NewCase';
import formNewCase from '../../models/formNewCase';
import Loading from '../../components/Loading';
import { observer } from 'mobx-react';
import { store } from '../../store';
import { SettingsCase } from '../../models/MyClasses';

interface NewCaseContainerProps {
    settingsCase: SettingsCase;
    loading: boolean;
    loadSettingsCase(): void;
    isOpenStatus: boolean;
    toggle(): void;
}

const NewCaseContainer = (props: NewCaseContainerProps) => {
    React.useEffect(() => {
        props.loadSettingsCase();
        console.log('getSettingsCase ok');
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
    }

    if (props.loading) {
        return <Loading />;
    }

    return (<div>
        <NewCase form={formNewCase} toggle={props.toggle} isOpenStatus={props.isOpenStatus} />
    </div>);
};

export default observer(() => <NewCaseContainer
    settingsCase={store.new_case.settingsCase}
    loading={store.new_case.loading}
    loadSettingsCase={store.new_case.loadSettingsCase}
    toggle={store.court.toggle}
    isOpenStatus={store.court.isOpenStatus}
/>);