﻿import * as React from 'react';
import { observer } from 'mobx-react';
import { Route, Redirect } from 'react-router';
import { BrowserRouter, useLocation } from 'react-router-dom';

import { store } from './store';

import Header from './components/Header';

import ProfileContainer from './components/settings/profile/ProfileContainer';
import Users from './components/management/users/Users';
import User from './components/management/user/User';
import SettingsBlock from './components/settings/SettingsBlock';
import Units from './components/settings/units/Units';
import NewUnitContainer from './components/settings/units/NewUnitContainer';

import CasesBlock from './components/cases/CasesBlock';
import CaseContainer from './components/case/CaseContainer';
import { Button, makeStyles, Theme, createStyles, Typography, CircularProgress, Box, LinearProgress, CardContent } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            '& > * + *': {
                marginLeft: theme.spacing(2),
            },
        },
    }),
);

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const CasesPage = () => {
    let query = useQuery();    
    return <CasesBlock
        reg_number={query.get(`reg_number`)}
        case_number={query.get(`case_number`)}
        court={query.get(`court`)}
        unit={query.get(`unit`)}
        type_role={query.get(`type_role`)}
        category={query.get(`category`)}
        status={query.get(`status`)}
        executor={query.get(`executor`)}
    />;
};

const CasePage = () => {
    let query = useQuery();
    return <CaseContainer
        _id={query.get(`_id`)}
    />;
};

const UsersPage = () => {
    let query = useQuery();
    return <Users active={query.get(`active`)} active2={query.get(`active2`)} />;
};

const UserPage = () => {
    let query = useQuery();
    const email = query.get(`email`);
    if (!email) return <div>No user</div>;
    return <User email={email} />;
};

const Loadings = observer(() => {
    if (store.management_user.loading || store.auth.loading || store.management_user.loading || store.cases.loading)
        return <LinearProgress />;
    return <></>;
});

export default observer(() => {
    const classes = useStyles();
    React.useEffect(() => { store.auth.loadAuth2(); }, []);

    if (!store.auth.downloadedAuth2) {
        return <LinearProgress />;
    }

    return (
        <BrowserRouter>
            <Loadings />
            <Header />

            {!store.auth.isSignedIn || !(store.auth.user && store.auth.user.active) ? <Redirect to='/' /> : null}

            <Route exact path='/'>
                {store.auth.isSignedIn && store.auth.user && store.auth.user.active ? <Redirect to='/cases' /> : null}
            </Route>

            {store.auth.isSignedIn && store.auth.user && store.auth.user.active ?
                <div>
                    <Route exact path='/cases' component={CasesPage} />
                    <Route exact path='/case' component={CasePage} />

                    <Route path='/management/users' component={UsersPage} />
                    <Route path='/management/user' component={UserPage} />

                    <Route path='/settings' component={SettingsBlock} />

                    <Route path='/settings/units' component={Units} />
                    <Route path='/settings/units/new' component={NewUnitContainer} />

                    <Route path='/settings/profile' component={ProfileContainer} />
                </div> :
                null
            }
        </BrowserRouter>
    );
});