import * as React from 'react';
import { connect } from 'react-redux';
import { Data } from './Data';
import Profile from './Profile';
import form from '../model/form';
import { store } from '../store2';

const ProfileContainer = () => {
    form.$('name').value = store.auth.currentUser ? store.auth.currentUser.name : null;
    return (<div>
        <Profile form={form} />
    </div>);
};

export default ProfileContainer;
