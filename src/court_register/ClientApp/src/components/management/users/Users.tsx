﻿import * as React from 'react';
import { observer } from 'mobx-react';
import { Redirect, useParams } from 'react-router';

import { store } from '../../../store';
import { User } from '../../../models/MyClasses';
import Loading from '../../../components/Loading';
import { NavLink } from 'react-router-dom';
import * as queryString from 'query-string'

declare var window: any;

type UsersProps = {
    users: User[] | null;
    loading: boolean;
    loadUsers(active: boolean): void;
    activateUser(email: string | null): void;
    deactivateUser(email: string | null): void;
    search(): any;
    active: string | null;
    active2: string | null;
};

const $btn = 'f6 link dim bn br2 ph3 pv2 mr2 dib white bg-dark-blue';

const Users = (props: UsersProps) => {
    React.useEffect(() => {
        let queryFilter = queryString.parse(window.location.search);
        props.loadUsers(queryFilter.active == 'true');
        console.log('loadUsers()');
        console.log('1111' + props.active2);
        console.log(queryFilter.active ? queryFilter.active : '-');
    }, [props.active, props.active2]);

    if (props.loading) {
        return <Loading />;
    }
    return (
        <div>
            <div>Список пользователей</div>
            {props.active}
            <div>
                <NavLink to={`/management/users?active=false`}>Список неактивных пользователей</NavLink>
            </div>

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
                            <tr key={user.email ? user.email : undefined}>
                                <td>{user._id}</td>
                                <td>{user.email}</td>
                                <td>{user.first_name}</td>
                                <td>{user.active ? <div>true</div> : <div>false</div>}</td>
                                <td>{user.permission ? user.permission.admin ? < div > true</div> : <div>false</div> : null}</td>
                                <td>
                                    <NavLink to={`/management/user?email=${user.email}`}>Открыть профиль</NavLink>
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

export default observer((props: {
    active: string | null;
    active2: string | null;
}) => <Users
        users={store.admin.users}
        loading={store.admin.loading}
        loadUsers={store.admin.loadUsers}
        activateUser={store.admin.activateUser}
        deactivateUser={store.admin.deactivateUser}
        search={store.admin.search}
        active={props.active}
        active2={props.active2}
    />);