import { observer } from 'mobx-react-lite';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Form, Grid, Segment } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import { Form as FinalForm, Field } from 'react-final-form';

import { IActivity, IActivityFormValues, ActivityFormValues } from '../../app/interfaces/IActivity';
import ActivityStore from '../../app/stores/activityStore';
import TextInput from '../form/TextInput';
import TextAreaInput from '../form/TextAreaInput';
import { SelectInput } from '../form/SelectInput';
import { category } from '../../helpers/categoryOptions';
import { DateInput } from '../form/DateInput';
import { combineDateAndTime } from '../../helpers/util';

interface DetailParams {
    id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
    const activityStore = React.useContext(ActivityStore);
    const {
        createActivity,
        editActivity,
        submitting,
        activity: initialFormState,
        loadActivity,
        clearActivity,
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

    // const handleSubmit = async () => {
    //     if (activity.id.length === 0) {
    //         let newActivity = {
    //             ...activity,
    //             id: uuid()
    //         };
    //         await createActivity(newActivity);
    //         history.push(`/activities/${newActivity.id}`);
    //     } else {
    //         await editActivity(activity);
    //         history.push(`/activities/${activity.id}`);
    //     }
    // };

    const handleFinalFormSubmit = (values: any) => {
        const dateAndtime = combineDateAndTime(values.date, values.time);
        const { date, time, ...activity } = values;
        activity.date = dateAndtime;
        console.log(activity);
    };

    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing >
                    <FinalForm
                        initialValues={activity}
                        onSubmit={handleFinalFormSubmit}
                        render={({ handleSubmit }) => (
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
                                    disabled={loading}
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
                                    onClick={() => history.push('/activities')}
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
