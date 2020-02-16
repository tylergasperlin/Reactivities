import { observer } from 'mobx-react-lite';
import React from 'react';
import { Item, Segment } from 'semantic-ui-react';

import ActivityStore from '../../app/stores/activityStore';
import ActivityListItem from '../activity-list-item/ActivityListItem';

const ActivityList: React.FC = () => {
    const activityStore = React.useContext(ActivityStore);
    const { activitiesByDate } = activityStore;
    console.log(activitiesByDate)
    return (
        <Segment clearing>
            <Item.Group divided>
                {activitiesByDate.map(activity => (
                    <ActivityListItem key={activity.id} activity={activity} />
                ))}
            </Item.Group>
        </Segment>
    );
};

export default observer(ActivityList);
