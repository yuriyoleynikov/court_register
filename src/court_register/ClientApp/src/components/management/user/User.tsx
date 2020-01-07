import * as React from 'react';

import Profile from './../../settings/profile/Profile';
import formUser from '../../../models/formUser';
import { store } from '../../../store';
import { User } from '../../../models/MyClasses';

const ProfileContainer = (props: UserProps) => {
    //formUser.$('first_name').value = store.auth.user ? store.auth.user.first_name : null;
    //formUser.$('second_name').value = store.auth.user ? store.auth.user.second_name : null;
    //formUser.$('third_name').value = store.auth.user ? store.auth.user.third_name : null;
    return (<div>
        <Profile form={formUser} />
    </div>);
};

export default ProfileContainer;


//import * as React from 'react';
//import { observer } from 'mobx-react';
//import { Redirect, useParams } from 'react-router';

//import { store } from '../../../store'

//import Loading from '../../../components/Loading';
//import { NavLink } from 'react-router-dom';


type UserProps = {
//    user: User | null;
//    loading: boolean;
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