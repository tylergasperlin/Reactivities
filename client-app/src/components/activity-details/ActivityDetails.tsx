import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';

import { IActivityDetails } from './IActivityDetails';
import ActivityStore from '../../app/stores/activityStore'
import { observer } from 'mobx-react-lite';

const ActivityDetails: React.FC<IActivityDetails> = ({
    setEditMode,
    setSelectedActivity
    
}) => {
    const activityStore = React.useContext(ActivityStore)
    const {selectedActivity: activity} = activityStore; //assign name of activty to selectedActivity

    return (
        <Card>
            <Image
                src={`/assets/category/${activity!.category}.jpg`}
                wrapped
                ui={false}
            />
            <Card.Content>
                <Card.Header>{activity!.title}</Card.Header>
                <Card.Meta>
                    <span>{activity!.date}</span>
                </Card.Meta>
                <Card.Description>{activity!.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button
                        basic
                        color='blue'
                        content='Edit'
                        onClick={() => setEditMode(true)}
                    />
                    <Button
                        basic
                        color='grey'
                        content='Cancel'
                        onClick={() => setSelectedActivity(null)}
                    />
                </Button.Group>
            </Card.Content>
        </Card>
    );
};

export default observer(ActivityDetails)