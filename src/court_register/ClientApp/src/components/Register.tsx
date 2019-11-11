import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from "redux-form";
import * as Auth from '../store/Auth';

interface RegData {
    email: string,
    password: string,
    confirm_password: string
}

const RegisterContainer = (props: any) => {
    const onSubmit = (formData: any) => {        
        props.registration(
            formData.email,
            formData.password,
            formData.confirm_password
        );
    };
    return <div>
        <div>Register</div>
        <RegisterReduxForm onSubmit={onSubmit} />
    </div>;
}

const RegisterForm = (props: any) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field
                placeholder={'email'}
                name={'email'}
                component={'input'}
            />
        </div>
        <div>
            <Field
                placeholder={'password'}
                name={'password'}
                component={'input'}
            />
        </div>
        <div>
            <Field
                placeholder={'confirmpassword'}
                name={'confirmpassword'}
                component={'input'}
            />
        </div>
        <div>
            <button>Register</button>
        </div>
    </form>;
};

const RegisterReduxForm = reduxForm({
    form: 'register'
})(RegisterForm);

export default connect((state: any) => state.auth, Auth.actionCreators)(RegisterContainer);