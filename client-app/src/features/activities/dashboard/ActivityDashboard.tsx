import React from 'react';
import { Grid } from 'semantic-ui-react';

import { iProps } from '../../../app/interfaces/iActivity';
import { ActivityList } from './ActivityList';


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
