import * as React from 'react';
import NewCase from './NewCase';
import formNewCase from '../../model/formNewCase';
import Loading from '../../Loading';
import { observer } from 'mobx-react';
import { store } from '../../store2';
import { SettingsCase } from '../../model/MyClasses';

interface NewCaseContainerProps {
    settingsCase: SettingsCase;
    loading: boolean;
    loadSettingsCase(): void;
    //openCourt: boolean;
    //onClickNewCort(): void;
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
    }

    if (props.loading) {
        return <Loading />;
    }

    return (<div>
        <NewCase form={formNewCase} />
    </div>);
};

export default observer(() => <NewCaseContainer
    settingsCase={store.new_case.settingsCase}
    loading={store.new_case.loading}
    loadSettingsCase={store.new_case.loadSettingsCase}    
/>);