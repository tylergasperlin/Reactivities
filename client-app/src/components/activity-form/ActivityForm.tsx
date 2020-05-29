import { observer } from 'mobx-react-lite';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Form, Grid, Segment } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import { Form as FinalForm, Field } from 'react-final-form';

import { ActivityFormValues } from '../../app/interfaces/IActivity';
import ActivityStore from '../../app/stores/activityStore';
import TextInput from '../form/TextInput';
import TextAreaInput from '../form/TextAreaInput';
import { SelectInput } from '../form/SelectInput';
import { category } from '../../helpers/categoryOptions';
import { DateInput } from '../form/DateInput';
import { combineDateAndTime } from '../../helpers/util';
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan } from 'revalidate'
import { RootStoreContext } from '../../app/stores/rootStore';

const validate = combineValidators ({
    title: isRequired({ message: 'The event title is required'}),
    category: isRequired('Category'),
    description: composeValidators(
        isRequired('Description'),
        hasLengthGreaterThan(4)({message: 'Description needs to be at least 5 characters'})
    )(),
    city: isRequired('City'),
    venue: isRequired('Venue'),
    date: isRequired('Date'),
    time: isRequired('Time')
});

interface DetailParams {
    id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
    const { activityStore } = React.useContext(RootStoreContext);
    const {
        createActivity,
        editActivity,
        submitting,
        loadActivity,
    } = activityStore;

    const [activity, setActivity] = React.useState(new ActivityFormValues());
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if (match.params.id) {
            setLoading(true);
            //we can use then beacuse @action loadActivity returns a promise due to it being async
            loadActivity(match.params.id)
                .then((activity) => setActivity(new ActivityFormValues(activity)))
                .finally(() => setLoading(false));
        }
    }, [loadActivity, match.params.id]);

    const handleFinalFormSubmit = async (values: any) => {
        const dateAndtime = combineDateAndTime(values.date, values.time);
        const { date, time, ...activity } = values;
        activity.date = dateAndtime;
        if (!activity.id) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            await createActivity(newActivity);
        } else {
            await editActivity(activity);
        }

    };

    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing >
                    <FinalForm
                        validate={validate}
                        initialValues={activity}
                        onSubmit={handleFinalFormSubmit}
                        render={({ handleSubmit, invalid, pristine }) => (
                            <Form loading={loading}>
                                <Field
                                    name='title'
                                    placeholder={'Title'}
                                    value={activity.title}
                                    component={TextInput}
                                />
                                <Field
                                    name='description'
                                    placeholder={'Description'}
                                    value={activity.description}
                                    component={TextAreaInput}
                                    rows={3}
                                />
                                <Field
                                    placeholder={'Category'}
                                    name='category'
                                    value={activity.category}
                                    component={SelectInput}
                                    options={category}
                                />
                                <Form.Group widths='equal'>
                                    <Field
                                        component={DateInput}
                                        name='date'
                                        date={true}
                                        placeholder='Date'
                                        value={activity.date}
                                    />
                                    <Field
                                        component={DateInput}
                                        name='time'
                                        time={true}
                                        placeholder='Time'
                                        value={activity.time}
                                    />
                                </Form.Group>
                                <Field
                                    name='city'
                                    placeholder={'City'}
                                    value={activity.city}
                                    component={TextInput}
                                />
                                <Field
                                    name='venue'
                                    placeholder={'Venue'}
                                    value={activity.venue}
                                    component={TextInput}
                                />
                                <Button
                                    loading={submitting}
                                    disabled={loading || invalid || pristine}
                                    floated='right'
                                    positive
                                    type='submit'
                                    content='Submit'
                                    onClick={() => handleSubmit()}
                                />
                                <Button
                                    floated='right'
                                    disabled={loading}
                                    type='button'
                                    content='Cancel'
                                    onClick={activity.id ? () => history.push(`/activities/${activity.id}`) : () => history.push('/activities')}
                                />
                            </Form>
                        )}
                    ></FinalForm>
                </Segment>
            </Grid.Column>
        </Grid>
    );
};

export default observer(ActivityForm);
