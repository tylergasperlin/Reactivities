import React from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import {IActivityForm} from './IActivityForm'
import { IActivity } from '../../app/interfaces/IActivity';
import {v4 as uuid} from 'uuid'


export const ActivityForm: React.FC<IActivityForm> = ({
    setEditMode,
    initialFormState,
    createActivity,
    editActivity,
    submitting
}) => {

    const initializeForm = () => {
        if (initialFormState !== null) {
            return initialFormState;
        } else {
            return {
                id: '',
                title: '',
                category: '',
                description: '',
                date: '',
                city: '',
                venue: ''
            };
        }
    };

    const [activity, setActivity] = React.useState<IActivity>(initializeForm);

    const handleSubmit = () =>{
        if(activity.id.length === 0 ){
            let newActivity = {
                ...activity, id: uuid()
            }
            createActivity(newActivity);

        } else {
            editActivity(activity)
        }
    }
    
    const handleInputChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
                    value={activity.title}
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
                <Form.Input onChange={handleInputChange} name='city' placeholder={'City'} value={activity.city} />
                <Form.Input onChange={handleInputChange} name='venue' placeholder={'Venue'} value={activity.venue} />
                <Button
                    loading={submitting}
                    floated='right'
                    positive
                    type='submit'
                    content='Submit'
                    onClick={()=>handleSubmit()}
                />
                <Button
                    floated='right'
                    type='button'
                    content='Cancel'
                    onClick={() => setEditMode(false)}
                />
            </Form>
        </Segment>
    );
};
