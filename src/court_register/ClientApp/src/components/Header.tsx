import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react';

import { store } from '../store'
import Loading from '../components/Loading';
import Settings from './settings/Settings';
import Management from './management/Management';
import CaseLink from './CaseLink';


export default observer(() => {
    const login = () => {
        store.auth.signIn();
    }

    const logout = () => {
        store.auth.signOut();
    }

    if (store.auth.loading)
        return <Loading />

    return <div>
        <div><NavLink className="text-dark" to="/">Реестр судебных дел</NavLink></div>
        {!store.auth.isSignedIn
            ? <div>
                <button onClick={login}>Log in</button>
            </div>
            : <div>
                <div>Здравствуйте <NavLink className="text-dark" to="/profile">{store.auth.user!.email}</NavLink>!</div>
                <button onClick={logout}>Log out</button>
            </div>
        }
        {store.auth.isSignedIn
            ?
            <div>
                <div><Settings /></div>
                <div><Management /></div>
                <div><CaseLink /></div>
            </div>
            : null
        }
    </div>;
});