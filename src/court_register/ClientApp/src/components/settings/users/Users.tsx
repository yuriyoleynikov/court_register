import * as React from 'react';
import { observer } from 'mobx-react';

import { store } from '../../../store2'
import { User } from '../../../model/Auth';
import Loading from '../../../Loading';

type UsersProps = {
    users: User[] | null;
    loading: boolean;
    loadUsers(): void;
    activateUser(email: string): void;
    deactivateUser(email: string): void;
}

const $btn = 'f6 link dim bn br2 ph3 pv2 mr2 dib white bg-dark-blue';
const Users = (props: UsersProps) => {
    React.useEffect(() => { props.loadUsers(); console.log('loadUsers ok'); }, [])
    const showUser = (email: string) => {
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
                        props.users.map((user: any) =>
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.email}</td>
                                <td>{user.name}</td>
                                <td>{user.active ? <div>true</div> : <div>false</div>}</td>
                                <td>{user.admin ? <div>true</div> : <div>false</div>}</td>
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