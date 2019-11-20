import * as React from 'react';
import { observer } from 'mobx-react';

import { store } from '../store2'
import { User } from '../model/Auth';
import Loading from '../Loading';

type AdminProps = {
    users: User[] | null;
    loading: boolean;
    loadUsers(): void;
}

const Admin = (props: AdminProps) => {
    //React.useEffect(() => { props.loadUsers(); console.log('init 2 ok'); })
    if (props.loading) {
        return <div>
            <button type="button"
                className="btn btn-primary btn-lg"
                onClick={() => { props.loadUsers() }}>
                loadUsers
                </button>
            <Loading />
        </div>;
    }
    return (
        <div>
            <button type="button"
                className="btn btn-primary btn-lg"
                onClick={() => { props.loadUsers(); }}>
                loadUsers
                </button>
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>email</th>
                        <th>name</th>
                        <th>active</th>
                        <th>admin</th>
                    </tr>
                </thead>
                <tbody>
                    {props.users ?
                        props.users.map((user: any) =>
                            <tr key={user.email}>
                                <td>{user.email}</td>
                                <td>{user.name}</td>
                                <td>{user.active ? <div>true</div> : <div>false</div>}</td>
                                <td>{user.admin ? <div>true</div> : <div>false</div>}</td>
                            </tr>
                        ) : null}
                </tbody>
            </table>
        </div>
    );
};

export default observer(() => <Admin
    users={store.admin.users}
    loading={store.admin.loading}
    loadUsers={store.admin.loadUsers}
/>);