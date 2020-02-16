import { observer } from 'mobx-react-lite';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';

import { IActivity } from '../../app/interfaces/IActivity';
import ActivityStore from '../../app/stores/activityStore';

interface DetailParams {
    id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
    match
}) => {
    const activityStore = React.useContext(ActivityStore);
    const {
        createActivity,
        editActivity,
        submitting,
        cancelFormOpen,
        activity: initialFormState,
        loadActivity
    } = activityStore;

    React.useEffect(() => {
        if (match.params.id) {
            //we can use then beacuse @action loadActivity returns a promise due to it being async
            loadActivity(match.params.id).then(
                () => initialFormState && setActivity(initialFormState)
            );
        }
    });

    const [activity, setActivity] = React.useState<IActivity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    const handleSubmit = () => {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity);
        } else {
            editActivity(activity);
        }
    };

    const handleInputChange = (
        event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.currentTarget;
        //we can use [name] to select the input field because name is set to ='title'
        setActivity({ ...activity, [name]: value });
    };

    return (
        <Segment clearing>
            <Form>
                <Form.Input
                    onChange={handleInputChange}
                    name='title'
                    placeholder={'Title'}
                    value={activity?.title}
                />
                <Form.TextArea
                    rows={2}
                    onChange={handleInputChange}
                    name='description'
                    placeholder={'Description'}
                    value={activity.description}
                />
                <Form.Input
                    placeholder={'Category'}
                    onChange={handleInputChange}
                    name='category'
                    value={activity.category}
                />
                <Form.Input
                    placeholder={'Date'}
                    onChange={handleInputChange}
                    name='date'
                    type='datetime-local'
                    value={activity.date}
                />
                <Form.Input
                    onChange={handleInputChange}
                    name='city'
                    placeholder={'City'}
                    value={activity.city}
                />
                <Form.Input
                    onChange={handleInputChange}
                    name='venue'
                    placeholder={'Venue'}
                    value={activity.venue}
                />
                <Button
                    loading={submitting}
                    floated='right'
                    positive
                    type='submit'
                    content='Submit'
                    onClick={() => handleSubmit()}
                />
                <Button
                    floated='right'
                    type='button'
                    content='Cancel'
                    onClick={cancelFormOpen}
                />
            </Form>
        </Segment>
    );
};

export default observer(ActivityForm);
