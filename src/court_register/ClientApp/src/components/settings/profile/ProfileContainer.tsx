import * as React from 'react';

import Profile from './Profile';
import formUser from '../../../models/formUser';
import { store } from '../../../store';
import Loading from '../../Loading';

const ProfileContainer = () => {
    if (store.management_user.loading)
        return <Loading />;
    if (!store.management_user.loading) {
        formUser.$('first_name').value = store.auth.user ? store.auth.user.first_name : null;
        formUser.$('second_name').value = store.auth.user ? store.auth.user.second_name : null;
        formUser.$('third_name').value = store.auth.user ? store.auth.user.third_name : null;
    }
    return (<div>
        <Profile form={formUser} />
    </div>);
};

export default ProfileContainer;