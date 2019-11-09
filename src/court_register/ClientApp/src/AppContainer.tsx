import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from './store';
import * as Authentication from './store/Authentication';
import App from './App';
import Loading from './Loading';

const AppContainer = (props: any) => {
    // if (!props.isDownloadAuth2)
    //     props.loadingAuth2();
    // if (props.isLoadingAuth2)
    //     return <Loading />;
    return <App />;
};

export default connect(
    (state: ApplicationState) => state.authentication,
    Authentication.actionCreators
)(AppContainer as any);
