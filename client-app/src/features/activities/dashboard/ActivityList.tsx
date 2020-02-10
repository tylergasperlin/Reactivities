import React from 'react';
import { Item, Image, Button, Label, Segment } from 'semantic-ui-react';
import { iActivity } from '../../../app/interfaces/iActivity';

interface iProps {
    activities: iActivity[];
}

export const ActivityList: React.FC<iProps> = ({ activities }) => {
    return (
        <Segment clearing>
            <Item.Group divided>
                {activities.map(
                    (activity: iActivity): JSX.Element => (
                        <Item>
                            <Item.Content>
                                <Item.Header as='a'>{activity.title}</Item.Header>
                                <Item.Meta>{activity.date}</Item.Meta>
                                <Item.Description>
                                    <div>{activity.description}</div>
                                    <div>{activity.city}, {activity.venue}</div>
                                </Item.Description>
                                <Item.Extra>
                                    <Button
                                        floated='right'
                                        content='View'
                                        color='blue'
                                    />
                                    <Label basic content='Category' />
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    )
                )}
            </Item.Group>
        </Segment>
    );
};

{
    /* <List>
                {activities.map((activity: iActivity) => (
                <List.Item key={activity.id}>{activity.title}, {activity.description}: {activity.venue}</List.Item>
                ))}
            </List> */
}
