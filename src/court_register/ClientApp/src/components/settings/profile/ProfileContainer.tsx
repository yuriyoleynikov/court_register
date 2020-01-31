import * as React from 'react';

import Profile from './Profile';
import formUser from '../../../models/forms/formUser';
import { store } from '../../../models/store';
import Loading from '../../Loading';

const ProfileContainer = () => {
    if (store.page.userManagement.loading)
        return <Loading />;
    if (!store.page.userManagement.loading) {
        formUser.$('first_name').value = store.auth.user ? store.auth.user.first_name : null;
        formUser.$('second_name').value = store.auth.user ? store.auth.user.second_name : null;
        formUser.$('third_name').value = store.auth.user ? store.auth.user.third_name : null;
    }
    return (<div>
        <Profile form={formUser} />
    </div>);
};

export default ProfileContainer;