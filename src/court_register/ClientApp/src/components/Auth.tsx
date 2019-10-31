import * as React from 'react';
import * as Authentication from '../store/Authentication';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import Loading from '../Loading';

const Auth = (props: any) => {
    props.CheckAuth();

    const login = () => {
        props.requestLogIn();
    }

    const logout = () => {
        props.requestLogOut();
    }

    if (!props.isLoading)
        return <div>
            {!props.isAuth
                ? <div>
                    <button onClick={login}>Log in</button>
                </div>
                : <div>Hello {props.email}
                    <button onClick={logout}>Log out</button>
                </div>
            }
        </div>;
    return <Loading />;
};

export default connect(
    (state: ApplicationState) => state.authentication,
    Authentication.actionCreators
)(Auth as any);
