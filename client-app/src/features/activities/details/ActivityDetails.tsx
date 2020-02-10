import React from 'react';
import { Card, Image, Icon, Button } from 'semantic-ui-react';
import { iActivity, iPropsDetails } from '../../../app/interfaces/iActivity';

interface iProps {
    activity: iActivity;
}

export const ActivityDetails: React.FC<iPropsDetails> = ({activity, setEditMode}) => {
    return (
        <Card>
            <Image
                src={`/assets/category/${activity?.category}.jpg`}
                wrapped
                ui={false}
            />
            <Card.Content>
                <Card.Header>{activity?.title}</Card.Header>
                <Card.Meta>
                    <span >{activity?.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity?.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button basic color='blue' content='Edit' onClick={()=>setEditMode(true)}/>
                    <Button basic color='grey' content='Cancel'/>
                </Button.Group>
            </Card.Content>
        </Card>
    );
};
