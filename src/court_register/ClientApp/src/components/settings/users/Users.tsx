import * as React from 'react';
import { observer } from 'mobx-react';

import { store } from '../../../store2'
import * as MyClasses from '../../../model/MyClasses';
import Loading from '../../../Loading';

type UsersProps = {
    users: MyClasses.User[] | null;
    loading: boolean;
    loadUsers(): void;
    activateUser(email: string | null): void;
    deactivateUser(email: string | null): void;
}

const $btn = 'f6 link dim bn br2 ph3 pv2 mr2 dib white bg-dark-blue';
const Users = (props: UsersProps) => {
    React.useEffect(() => { props.loadUsers(); console.log('loadUsers ok'); }, [])
    const showUser = (email: string | null) => {
        console.log('showUser ok' + email);
    }
    if (props.loading) {
        return <div>
            <Loading />
        </div>;
    }
    return (
        <div>
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
                        props.users.map((user: MyClasses.User) =>
                            <tr key={user._id ? user._id : undefined}>
                                <td>{user._id}</td>
                                <td>{user.email}</td>
                                <td>{user.first_name}</td>
                                <td>{user.active ? <div>true</div> : <div>false</div>}</td>
                                <td>{user.permission ? user.permission.admin ? < div > true</div> : <div>false</div> : null}</td>
                                <td>
                                    <button type="button"
                                        //className="btn btn-primary btn-lg"
                                        className={$btn}
                                        onClick={() => { showUser(user.email) }}>
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