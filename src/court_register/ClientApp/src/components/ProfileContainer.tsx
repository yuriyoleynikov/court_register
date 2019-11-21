import * as React from 'react';
import { connect } from 'react-redux';
import { Data } from './Data';
import Profile from './Profile';
import form from '../model/form';

const ProfileContainer = () => (
    <Profile form={form} />
);

export default ProfileContainer;
