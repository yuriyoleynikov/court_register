import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import ProfileContainer from './components/ProfileContainer';
import Admin from './components/Admin';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import { ConnectedRouter } from 'connected-react-router';
import { history } from "./router";
import "tachyons";

import './custom.css'

export default () => (
    <ConnectedRouter history={history}>
        <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/admin' component={Admin} />
            <Route path='/counter' component={Counter} />
            <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
            <Route path='/profile' component={ProfileContainer} />
        </Layout>
    </ConnectedRouter>
);
