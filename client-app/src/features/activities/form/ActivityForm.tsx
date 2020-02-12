import React from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { iActivity } from '../../../app/interfaces/iActivity'

interface iActivityForm{
    setEditMode: (editMode: boolean) => void;
    initialFormState: iActivity | null;
}

export const ActivityForm: React.FC<iActivityForm> = ({setEditMode, initialFormState}) => {
    console.log(initialFormState)

    const initializeForm = () =>{
        if (initialFormState !== null) {
            return initialFormState
        } else {
            return {
                id: '',
                title: '',
                category: '',
                description: '',
                date: '',
                city: '',
                venue: ''
            }
        }
    }
    console.log(initializeForm())
    const [activity, setActivity] = React.useState<iActivity>(initializeForm)
    console.log(activity)
    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder={'Title'} value={activity.title}/>
                <Form.TextArea rows={2} placeholder={'Description'} value={activity.description}/>
                <Form.Input placeholder={'Category'} value={activity.category}/>
                <Form.Input placeholder={'Date'} type='date' value={activity.date}/>
                <Form.Input placeholder={'City'} value={activity.city}/>
                <Form.Input placeholder={'Venue'} value={activity.venue}/>
                <Button floated='right' positive type='submit' content='Submit' />
                <Button floated='right' type='button' content='Cancel' onClick={()=>setEditMode(false)} />
            </Form>
        </Segment>
    )
}
