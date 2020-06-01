import { FORM_ERROR } from 'final-form';
import React, { useContext } from 'react';
import { Field, Form as FinalForm } from 'react-final-form';
import { combineValidators, isRequired } from 'revalidate';
import { Button, Form, Header } from 'semantic-ui-react';

import { IUserFormValues } from '../../app/interfaces/IUser';
import { RootStoreContext } from '../../app/stores/rootStore';
import ErrorMessage from '../form/ErrorMessage';
import TextInput from '../form/TextInput';

const validate = combineValidators({
    username: isRequired('username'),
    displayName: isRequired('displayName'),
    email: isRequired('email'),
    password: isRequired('password')
});

const RegisterForm = () => {
    const rootStore = useContext(RootStoreContext);
    const { register } = rootStore.userStore;

    return (
        <FinalForm
            onSubmit={(values: IUserFormValues) =>
                register(values).catch((error) => ({
                    [FORM_ERROR]: error,
                }))
            }
            validate={validate}
            render={({
                handleSubmit,
                submitting,
                submitError,
                invalid,
                pristine,
                dirtySinceLastSubmit,
            }) => (
                <Form onSubmit={handleSubmit} error>
                    <Header
                        as='h2'
                        content='Sign up for Reactivities'
                        color='teal'
                        textAlign='center'
                    />
                    <Field name='username' component={TextInput} placeholder='User Name' />
                    <Field name='displayName' component={TextInput} placeholder='Display Name' />
                    <Field name='email' component={TextInput} placeholder='Email' />

                    <Field
                        type='password'
                        name='password'
                        component={TextInput}
                        placeholder='Password'
                    />
                    {submitError && !dirtySinceLastSubmit && (
                        <ErrorMessage error={submitError} text='Invalid username or password' />
                    )}

                    <Button
                        disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                        loading={submitting}
                        color='teal'
                        content='Login'
                        fluid
                    />
                </Form>
            )}
        />
    );
};

export default RegisterForm;
