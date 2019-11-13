import * as React from 'react';
import { connect } from 'react-redux';
//import { ApplicationState } from './store';
//import * as Authentication from './store/Authentication';
import App from './App';
import Loading from './Loading';
import { store } from '../src/store2'
import { observer } from 'mobx-react';

const AppContainer = (props: any) => {
    React.useEffect(() => { props.loadAuth2(); console.log('init 2 ok'); })
    if (!props.downloadedAuth2)
        return <Loading />;
    return <App />;
};

export default observer(() => <AppContainer
    downloadedAuth2={store.auth.downloadedAuth2}
    loadAuth2={store.auth.loadAuth2}
/>);

//export default connect(
//    (state: ApplicationState) => state.authentication,
//    Authentication.actionCreators
//)(AppContainer as any);
