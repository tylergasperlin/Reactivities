import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Label } from 'semantic-ui-react';

import { IActivity } from '../../app/interfaces/IActivity';

const ActivityListItem: React.FC<{activity: IActivity}> = ({activity}) => {
    return (
        <Item key={activity.id}>
            <Item.Content>
                <Item.Header as='a'>{activity.title}</Item.Header>
                <Item.Meta>{activity.date}</Item.Meta>
                <Item.Description>
                    <div>{activity.description}</div>
                    <div>
                        {activity.city}, {activity.venue}
                    </div>
                </Item.Description>
                <Item.Extra>
                    <Button
                        floated='right'
                        content='View'
                        color='blue'
                        as={Link}
                        to={`/activities/${activity.id}`}
                    />

                    <Label basic content='Category' />
                </Item.Extra>
            </Item.Content>
        </Item>
    );
};

export default ActivityListItem