import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';

import ActivityStore from '../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { LoadingComponent } from '../loading/LoadingComponent';

//within app.tsx we define that the url will have a variable named id (could be anything we want ut we chose id. )
//beecause of this we create and interface with id and pass it to RouteComponentProps so we can use match.params.id within loadActivity
interface DetailParams {
    id: string;
}
const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({
    match
}) => {
    const activityStore = React.useContext(ActivityStore);
    const {
        activity,
        openEditForm,
        cancelSelectedActivity,
        loadActivity,
        loadingInitial
    } = activityStore; //assign name of activty to selectedActivity

    React.useEffect(() => {
        loadActivity(match.params.id);
    }, [loadActivity, match.params.id]); //need to pass dependencies so it only runs once

    if (loadingInitial || !activity)
        return <LoadingComponent content='Loading activity...' />;

    return (
        <Card>
            <Image
                src={`/assets/category/${activity?.category}.jpg`}
                wrapped
                ui={false}
            />
            <Card.Content>
                <Card.Header>{activity!.title}</Card.Header>
                <Card.Meta>
                    <span>{activity!.date}</span>
                </Card.Meta>
                <Card.Description>{activity!.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button
                        basic
                        color='blue'
                        content='Edit'
                        onClick={() => openEditForm(activity!.id)}
                    />
                    <Button
                        basic
                        color='grey'
                        content='Cancel'
                        onClick={cancelSelectedActivity}
                    />
                </Button.Group>
            </Card.Content>
        </Card>
    );
};

export default observer(ActivityDetails);
