import React from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';

import { iActivity, iPropsActivityList } from '../../../app/interfaces/iActivity';

export const ActivityList: React.FC<iPropsActivityList> = ({activities, selectActivity, deleteActivity, target, submitting}) => {
    return (
        <Segment clearing>
            <Item.Group divided>
                {activities.map(
                    (activity: iActivity): JSX.Element => (
                        <Item key={activity.id}>
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
                                        onClick={()=>selectActivity(activity.id)}
                                    />
                                    <Button
                                        name={activity.id}
                                        loading={target === activity.id && submitting}
                                        floated='right'
                                        content='Delete'
                                        color='red'
                                        onClick={(e)=>deleteActivity(e, activity.id)}
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
