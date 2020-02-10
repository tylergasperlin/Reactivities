import React from 'react';
import { Grid } from 'semantic-ui-react';

import { iProps } from '../../../app/interfaces/iActivity';
import { ActivityList } from './ActivityList';
import { ActivityDetails } from '../details/ActivityDetails';


const ActivityDashboard:React.FC<iProps> = ({activities}) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList activities={activities}/>
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetails/>
            </Grid.Column>
        </Grid>

    )
}

export default ActivityDashboard;
