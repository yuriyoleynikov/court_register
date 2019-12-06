import * as React from 'react';
import NewCase from './NewCase';
import formNewCase from '../../model/formNewCase';
import Loading from '../../Loading';
import { observer } from 'mobx-react';
import { store } from '../../store2';

type NewCaseContainerProps = {
    settingsCase: any;
    loading: boolean;
    loadSettingsCase(): void;
}

const NewCaseContainer = (props: NewCaseContainerProps) => {
    React.useEffect(() => {
        props.loadSettingsCase();
        console.log('getSettingsCase ok');
    }, []);

    formNewCase.$('unit').extra = props.settingsCase ? props.settingsCase.units : null;

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