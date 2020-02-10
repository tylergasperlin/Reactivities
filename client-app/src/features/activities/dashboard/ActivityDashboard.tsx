import React from 'react'
import { Grid, List } from 'semantic-ui-react'
import { iActivity } from '../../../app/interfaces/iActivity';
import { ActivityList } from './ActivityList';

interface iProps{
    activities: iActivity[]
}

const ActivityDashboard:React.FC<iProps> = ({activities}) => {
    return (
        <Grid>
            <Grid.Column>
                <ActivityList activities={activities}/>
            </Grid.Column>
        </Grid>

    )
}

export default ActivityDashboard;
