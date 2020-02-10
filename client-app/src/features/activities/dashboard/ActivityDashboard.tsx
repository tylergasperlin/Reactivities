import React from 'react'
import { Grid, List } from 'semantic-ui-react'
import { iActivity } from '../../../app/interfaces/iActivity';

interface iProps{
    activities: iActivity[]
}

const ActivityDashboard:React.FC<iProps> = ({activities}) => {
    return (
        <Grid>
            <Grid.Column>
            <List>
                {activities.map((activity: iActivity) => (
                <List.Item key={activity.id}>{activity.title}, {activity.description}: {activity.venue}</List.Item>
                ))}
            </List>
            </Grid.Column>
        </Grid>

    )
}

export default ActivityDashboard;
