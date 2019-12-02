import * as React from 'react';
import Profile from './Profile';
import form from '../../../model/form';
import { store } from '../../../store2';

const ProfileContainer = () => {
    form.$('first_name').value = store.auth.user ? store.auth.user.first_name : null;
    form.$('second_name').value = store.auth.user ? store.auth.user.second_name : null;
    form.$('third_name').value = store.auth.user ? store.auth.user.third_name : null;
    return (<div>
        <Profile form={form} />
    </div>);
};

export default ProfileContainer;
