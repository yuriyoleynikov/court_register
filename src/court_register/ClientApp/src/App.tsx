import * as React from 'react';
import { observer } from 'mobx-react';
import { Route, Redirect } from 'react-router';
import { store } from './models/store';
import { useQuery } from './models';
import Header from './components/Header';
import Management from './components/management';
import Users from './components/management/users';
import User from './components/management/users/User';
import Units from './components/management/units';
import Unit from './components/management/units/Unit';
import Courts from './components/management/courts';
import Court from './components/management/courts/Court';
import Persons from './components/management/persons';
import Person from './components/management/persons/Person';
import Cases from './components/cases';
import Case from './components/cases/Case';
import Loading from './components/Loading';

const CasesPage = () => {
    let query = useQuery();
    return <Cases
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
    return <Case
        _id={query.get(`_id`)}
    />;
};
const UnitPage = () => {
    let query = useQuery();
    return <Unit
        _id={query.get(`_id`)}
    />;
};
const CourtPage = () => {
    let query = useQuery();
    return <Court
        _id={query.get(`_id`)}
    />;
};
const PersonsPage = () => {
    let query = useQuery();
    return <Persons
        _type={query.get(`_type`)}
    />;
};
const PersonPage = () => {
    let query = useQuery();
    return <Person
        _id={query.get(`_id`)}
    />;
};
const UsersPage = () => {
    let query = useQuery();
    return <Users active={query.get(`active`)} />;
};
const UserPage = () => {
    let query = useQuery();
    const email = query.get(`email`);
    if (!email) return <div>No user</div>;
    return <User email={email} />;
};

export default observer(() => {
    React.useEffect(() => { store.auth.loadAuth2(); }, []);

    if (!store.auth.downloadedAuth2) {
        return <Loading />;
    }

    return (<>
        {store.isLoading ? <Loading /> : null}
        <Header />

        <Route exact path='/'>
            {store.auth.isSignedIn && store.auth.user && store.auth.user.active ? <Redirect to='/cases' /> : null}
        </Route>

        {store.auth.isSignedIn && store.auth.user && store.auth.user.active ?
            <>
                <Route exact path='/cases' component={CasesPage} />
                <Route exact path='/case' component={CasePage} />

                <Route path='/management' component={Management} />

                <Route path='/management/users' component={UsersPage} />
                <Route path='/management/user' component={UserPage} />

                <Route path='/management/units' component={Units} />
                <Route path='/management/unit' component={UnitPage} />

                <Route path='/management/courts' component={Courts} />
                <Route path='/management/court' component={CourtPage} />

                <Route path='/management/persons' component={PersonsPage} />
                <Route path='/management/person' component={PersonPage} />

            </> :
            null
        }
    </>);
});