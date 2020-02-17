import { observer } from 'mobx-react-lite';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import ActivityStore from '../../app/stores/activityStore';
import ActivityDetailedChat from '../activity-detailed-chat/ActivityDetailedChat';
import ActivityDetailedHeader from '../activity-detailed-header/ActivityDetailedHeader';
import { ActivityDetailedInfo } from '../activity-detailed-info/ActivityDetailedInfo';
import { ActivityDetailedSidebar } from '../activity-detailed-sidebar/ActivityDetailedSidebar';
import { LoadingComponent } from '../loading/LoadingComponent';

//within app.tsx we define that the url will have a variable named id (could be anything we want ut we chose id. )
//beecause of this we create and interface with id and pass it to RouteComponentProps so we can use match.params.id within loadActivity
interface DetailParams {
    id: string;
}

//match and hitory are properties of routeComponentProps
const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({
    match,
}) => {
    const activityStore = React.useContext(ActivityStore);
    const { activity, loadActivity, loadingInitial } = activityStore; //assign name of activty to selectedActivity

    React.useEffect(() => {
        loadActivity(match.params.id);
    }, [loadActivity, match.params.id]); //need to pass dependencies so it only runs once

    if (loadingInitial || !activity)
        return <LoadingComponent content='Loading activity...' />;

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={activity}/>
                <ActivityDetailedInfo activity={activity}/>
                <ActivityDetailedChat/>
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSidebar/>
            </Grid.Column>
        </Grid>
    );
};

export default observer(ActivityDetails);
