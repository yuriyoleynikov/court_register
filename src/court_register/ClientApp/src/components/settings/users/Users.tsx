import * as React from 'react';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router';

import { store } from '../../../store'
import { User } from '../../../models/MyClasses';
import Loading from '../../../components/Loading';


type UsersProps = {
    users: User[] | null;
    loading: boolean;
    loadUsers(): void;
    activateUser(email: string | null): void;
    deactivateUser(email: string | null): void;
}

const $btn = 'f6 link dim bn br2 ph3 pv2 mr2 dib white bg-dark-blue';

const Users = (props: UsersProps) => {
    React.useEffect(() => { props.loadUsers(); console.log('loadUsers()'); }, [])

    if (props.loading) {
        return <Loading />;
    }
    return (
        <div>
            {store.auth.isSignedIn ? null: <Redirect to="/" />}
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>_id</th>
                        <th>email</th>
                        <th>name</th>
                        <th>active</th>
                        <th>admin</th>
                    </tr>
                </thead>
                <tbody>
                    {props.users ?
                        props.users.map((user: User) =>
                            <tr /*key={user._id ? user._id : undefined}*/>
                                <td>{user._id}</td>
                                <td>{user.email}</td>
                                <td>{user.first_name}</td>
                                <td>{user.active ? <div>true</div> : <div>false</div>}</td>
                                <td>{user.permission ? user.permission.admin ? < div > true</div> : <div>false</div> : null}</td>
                                <td>
                                    <button type="button"
                                        //className="btn btn-primary btn-lg"
                                        className={$btn}
                                        onClick={() => { }}>
                                        Открыть
                                        </button>
                                </td>
                                <td>
                                    {user.active
                                        ?
                                        <button type="button"
                                            //className="btn btn-primary btn-lg"
                                            className={$btn}
                                            onClick={() => { props.deactivateUser(user.email) }}>
                                            deactivate
                                        </button>
                                        :
                                        <button type="button"
                                            //className="btn btn-primary btn-lg"
                                            className={$btn}
                                            onClick={() => { props.activateUser(user.email) }}>
                                            activate
                                        </button>}
                                </td>
                            </tr>
                        ) : null}
                </tbody>
            </table>
        </div>
    );
};

export default observer(() => <Users
    users={store.admin.users}
    loading={store.admin.loading}
    loadUsers={store.admin.loadUsers}
    activateUser={store.admin.activateUser}
    deactivateUser={store.admin.deactivateUser}
/>);