import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';

import { iPropsDetails } from '../../app/interfaces/iActivity';

export const ActivityDetails: React.FC<iPropsDetails> = ({
    activity,
    setEditMode,
    selectActivity
}) => {
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
                    <span>{activity?.date}</span>
                </Card.Meta>
                <Card.Description>{activity?.description}</Card.Description>
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
                        onClick={() => selectActivity('')}
                    />
                </Button.Group>
            </Card.Content>
        </Card>
    );
};
