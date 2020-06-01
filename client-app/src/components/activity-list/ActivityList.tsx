import { observer } from 'mobx-react-lite';
import React from 'react';
import { Item, Label } from 'semantic-ui-react';

import { RootStoreContext } from '../../app/stores/rootStore';
import ActivityListItem from '../activity-list-item/ActivityListItem';
import {format} from 'date-fns'

const ActivityList: React.FC = () => {
    const { activityStore } = React.useContext(RootStoreContext);
    const { activitiesByDate } = activityStore;
    return (
        <React.Fragment>
            {activitiesByDate.map(([group, activities]) => (
                <React.Fragment key={group}>
                    <Label size='large' color='blue'>
                        {format(group,'eee do MMMM')}
                    </Label>

                    <Item.Group divided>
                        {activities.map(activity => (
                            <ActivityListItem
                                key={activity.id}
                                activity={activity}
                            />
                        ))}
                    </Item.Group>
                </React.Fragment>
            ))}
        </React.Fragment>
    );
};

export default observer(ActivityList);
