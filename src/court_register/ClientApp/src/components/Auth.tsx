import * as React from 'react';
import * as Authentication from '../store/Authentication';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import Loading from '../Loading';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

import { store } from '../store2'
import { observer } from 'mobx-react';

const Auth = () => {
    //if (store.auth.downloadedAuth2)
    //    store.auth.getUser();

    const login = () => {
        store.auth.signIn();
    }

    const logout = () => {
        store.auth.signOut();
    }
    if (store.auth.loading)
        return <Loading />

    return <div>
        {!store.auth.isSignedIn
            ? <div>
                <button onClick={login}>Log in</button>
            </div>
            : <div>
                <div>Hello <NavLink tag={Link} className="text-dark" to="/profile">{store.auth.currentUser!.name}</NavLink></div>
                <button onClick={logout}>Log out</button>
            </div>
        }
    </div>;
};

export default observer(Auth);
