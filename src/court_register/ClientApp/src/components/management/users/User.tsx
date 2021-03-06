﻿import * as React from 'react';
import UserContainer from './UserContainer';
import formUser from '../../../models/forms/formUser';
import { store } from '../../../models/store';
import { observer } from 'mobx-react';

const User = observer((props: UserProps) => {
    React.useEffect(() => {
        store.page.user.loadUser(props.email);
        return () => {
        }
    }, []);

    if (!store.page.users.loading) {
        formUser.$('first_name').value = store.page.user.user ? store.page.user.user.first_name : null;
        formUser.$('second_name').value = store.page.user.user ? store.page.user.user.second_name : null;
        formUser.$('third_name').value = store.page.user.user ? store.page.user.user.third_name : null;
        formUser.$('email').value = store.page.user.user ? store.page.user.user.email : null;
        formUser.$('active').value = store.page.user.user ? store.page.user.user.active : null;
        formUser.$('admin').value = store.page.user.user && store.page.user.user.permission ?
            store.page.user.user.permission.admin : null;
        //formManagementUser.$('unitAdmin').value = store.management_user.user && store.management_user.user.permission ?
        //    store.management_user.user.permission.admin : null;
    }

    if (store.page.user.loading) {
        return <></>;
    }

    return (<div>
        <UserContainer form={formUser} />
    </div>);
});

//const UserEditor = observer((props: { userForm: any }) => {
//    return <Profile form={props.userForm} />;
//})

//const UserEditorContainer = (props: { email: string }) => {
//    const [loading, setLoading] = React.useState(true);
//    const [user, setUser] = React.useState<User | null>(null);

//    async function load() {
//        setLoading(true);
//        try {
//            setUser(createUserForm(await store.management_user.loadUser2(props.email)));
//        }
//        finally {
//            setLoading(false);
//        }
//    }

//    React.useEffect(() => {
//        load();
//        return () => {
//            console.log('on dismount or email changed')
//        }
//    }, [props.email])

//    if (user)
//        return <UserEditor userForm={user} />

//    return loading ? <Loading /> : <div>Something went wrong.</div>;
//};

//export default ProfileContainer;
//export default observer((props: { email: string; }) => <UserEditorContainer
//    email={props.email}
///>);
export default observer((props: { email: string; }) => <User
    email={props.email}
/>);

//import * as React from 'react';
//import { observer } from 'mobx-react';
//import { Redirect, useParams } from 'react-router';

//import { store } from '../../../store'

//import Loading from '../../../components/Loading';
//import { NavLink } from 'react-router-dom';


type UserProps = {
    //    user: User | null;
    //loading: boolean;
    //loadUser(email: string | null): void;
    //activateUser(email: string | null): void;
    //deactivateUser(email: string | null): void;
    email: string | null;
}

//const $btn = 'f6 link dim bn br2 ph3 pv2 mr2 dib white bg-dark-blue';

//const UserComp = (props: UserProps) => {
//    React.useEffect(() => { props.loadUser(props.email); console.log('loadUser()'); }, [])

//    if (props.loading) {
//        return <Loading />;
//    }

//    return (
//        <div>
//            <table className='table table-striped' aria-labelledby="tabelLabel">
//                <thead>
//                    <tr>
//                        <th>_id</th>
//                        <th>email</th>
//                        <th>name</th>
//                        <th>active</th>
//                        <th>admin</th>
//                    </tr>
//                </thead>
//                <tbody>
//                    {props.user ?
//                        <tr key={props.user.email ? props.user.email : undefined}>
//                            <td>{props.user._id}</td>
//                            <td>{props.user.email}</td>
//                            <td>{props.user.first_name}</td>
//                            <td>{props.user.active ? <div>true</div> : <div>false</div>}</td>
//                            <td>{props.user.permission ? props.user.permission.admin ? < div > true</div> : <div>false</div> : null}</td>
//                            <td>
//                                <NavLink to={"/management/user/" + props.user.email}>Открыть профиль</NavLink>
//                            </td>
//                            <td>
//                                {props.user.active
//                                    ?
//                                    <button type="button"
//                                        //className="btn btn-primary btn-lg"
//                                        className={$btn}
//                                        onClick={() => { props.deactivateUser(props.user != null ? props.user.email: '') }}>
//                                        deactivate
//                                        </button>
//                                    :
//                                    <button type="button"
//                                        //className="btn btn-primary btn-lg"
//                                        className={$btn}
//                                        onClick={() => { props.activateUser(props.user != null ? props.user.email : '') }}>
//                                        activate
//                                        </button>}
//                            </td>
//                        </tr>
//                        : null}
//                </tbody>
//            </table>
//        </div>
//    );
//};

//export default observer((props: { email: string | null; }) => <UserComp
//    user={store.user_page.user}
//    loading={store.admin.loading}
//    loadUser={store.user_page.loadUser}
//    activateUser={store.admin.activateUser}
//    deactivateUser={store.admin.deactivateUser}
//    email={props.email}
///>);