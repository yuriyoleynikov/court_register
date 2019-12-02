import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import ProfileContainer from './components/settings/profile/ProfileContainer';
import Users from './components/settings/users/Users';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import { ConnectedRouter } from 'connected-react-router';
import { history } from "./router";
import "tachyons";

import './custom.css'
import SettingsBlock from './components/settings/SettingsBlock';
import Units from './components/settings/units/Units';
import NewUnitContainer from './components/settings/units/NewUnitContainer';

export default () => (
    <ConnectedRouter history={history}>
        <Layout>
            <Route exact path='/' component={Home} />

            <Route path='/settings' component={SettingsBlock} />

            <Route path='/settings/users' component={Users} />
            <Route path='/settings/units' component={Units} />
            <Route path='/settings/units/new' component={NewUnitContainer} />
            <Route path='/settings/profile' component={ProfileContainer} />

            <Route path='/counter' component={Counter} />
            <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
        </Layout>
    </ConnectedRouter>
);
