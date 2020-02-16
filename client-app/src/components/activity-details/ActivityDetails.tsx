import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react';

import ActivityStore from '../../app/stores/activityStore';
import { LoadingComponent } from '../loading/LoadingComponent';

//within app.tsx we define that the url will have a variable named id (could be anything we want ut we chose id. )
//beecause of this we create and interface with id and pass it to RouteComponentProps so we can use match.params.id within loadActivity
interface DetailParams {
    id: string;
}

//match and hitory are properties of routeComponentProps
const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({
    match,
    history
}) => {
    const activityStore = React.useContext(ActivityStore);
    const {
        activity,
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
                        as={Link}
                        to={`/manage/${activity.id}`}
                        basic
                        color='blue'
                        content='Edit'
                    />
                    <Button
                        basic
                        color='grey'
                        content='Cancel'
                        // ex push user to activities page without using router - use code instead
                        onClick={() => history.push(`/activities`)}
                    />
                </Button.Group>
            </Card.Content>
        </Card>
    );
};

export default observer(ActivityDetails);
