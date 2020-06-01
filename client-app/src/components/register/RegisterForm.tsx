import React, { useContext } from 'react';
import { Form, Button, Label, Header } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../form/TextInput';
import { RootStoreContext } from '../../app/stores/rootStore';
import { IUserFormValues } from '../../app/interfaces/IUser';
import { FORM_ERROR } from 'final-form';
import { isRequired, combineValidators } from 'revalidate';
import ErrorMessage from '../form/ErrorMessage';

const validate = combineValidators({
    email: isRequired('email'),
    password: isRequired('password'),
    userName: isRequired('username'),
    displayName: isRequired('displayName')
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
            // validate={validate}
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
