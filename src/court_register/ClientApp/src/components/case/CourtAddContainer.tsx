import * as React from 'react';

import NewCourt from './NewCourt';
import formCourt from '../../models/forms/formCourt';
import { observer } from 'mobx-react';
import { store } from '../../models/store';
import { SettingsCase } from '../../models/MyClasses';

interface NewCourtContainerProps {
    //settingsCase: SettingsCase;
    //loading: boolean;
    //loadSettingsCase(): void;
    //isOpenStatus: boolean;
    //toggle(): void;
}

const CourtAddContainer = (props: NewCourtContainerProps) => {
    
    //if (!props.loading) {
    //    if (props.settingsCase.units != null) {
    //        let nameUnitsList = props.settingsCase.units.map(u => u.name);
    //        formNewCase.$('unit').$extra = nameUnitsList;
    //    }
    //    if (props.settingsCase.courts != null) {
    //        let nameCourtList = props.settingsCase.courts.map(u => u.name);
    //        formNewCase.$('court').$extra = nameCourtList;
    //    }
    //}

    //if (props.loading) {
    //    return <Loading />;
    //}

    return (<div>
        <NewCourt form={formCourt} />
    </div>);
};

export default observer(() => <CourtAddContainer
    //settingsCase={store.new_case.settingsCase}
    //loading={store.new_case.loading}
    //loadSettingsCase={store.new_case.loadSettingsCase}
    //toggle={store.court.toggle}
    //isOpenStatus={store.court.isOpenStatus}
/>);