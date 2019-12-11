import * as React from 'react';
import { observer } from 'mobx-react';
import { Route, Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import { store } from './store'

import Loading from './components/Loading';
import Header from './components/Header';

import ProfileContainer from './components/settings/profile/ProfileContainer';
import Users from './components/settings/users/Users';
import SettingsBlock from './components/settings/SettingsBlock';
import Units from './components/settings/units/Units';
import NewUnitContainer from './components/settings/units/NewUnitContainer';

import CasesBlock from './components/cases/CasesBlock';
import NewCaseContainer from './components/cases/NewCaseContainer';


export default observer(() => {
    React.useEffect(() => {
        store.auth.loadAuth2();
        console.log('loadAuth2() ok');
    }, [])

    if (!store.auth.downloadedAuth2)
        return <Loading />;

    return (<BrowserRouter>
        <Header />
        {!store.auth.isSignedIn ? <Redirect to="/" /> : null}

        <Route exact path="/">
            {store.auth.isSignedIn ? <Redirect to="/cases" /> : null}
        </Route>

        <Route exact path='/cases' component={CasesBlock} />
        <Route exact path='/case' component={NewCaseContainer} />

        <Route path='/settings' component={SettingsBlock} />

        <Route path='/settings/users' component={Users} />
        <Route path='/settings/units' component={Units} />
        <Route path='/settings/units/new' component={NewUnitContainer} />

        <Route path='/settings/profile' component={ProfileContainer} />
    </BrowserRouter>);
});
