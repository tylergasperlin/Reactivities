import './App.css';
import React, { SyntheticEvent } from 'react';
import { Container } from 'semantic-ui-react';
import {observer} from 'mobx-react-lite'
import ActivityDashboard from '../../components/activity-dashboard/ActivityDashboard';
import NavBar from '../../components/nav/NavBar';
import { IActivity } from '../../app/interfaces/IActivity';
import agent from '../../app/api/agent';
import { LoadingComponent } from '../../components/loading/LoadingComponent';
import ActivityStore from '../../app/stores/activityStore'

const App: React.FC = () => {
    const activityStore = React.useContext(ActivityStore)
    const initialState: IActivity = {
        id: '',
        title: '',
        description: '',
        category: '',
        date: '',
        city: '',
        venue: ''
    };

    const [activities, setActivities] = React.useState<IActivity[]>([
        initialState
    ]);
    const [
        selectedActivity,
        setSelectedActivity
    ] = React.useState<IActivity | null>(null);

    const [editMode, setEditMode] = React.useState(false);
    const [loading, setLoading] = React.useState(true)
    const [submitting, setSubmitting] = React.useState(false)
    const [target, setTarget] = React.useState('')

    const handleSelectActivity = (id: string) => {
        setSelectedActivity(activities.filter(a => a.id === id)[0]);
        setEditMode(false);
    };


    const handleOpenCreateForm = () => {
        setSelectedActivity(null);
        setEditMode(true);
    };

    const handleCreateActivity = async (activity: IActivity) => {
        setSubmitting(true)
        await agent.Activities.create(activity)
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false)
    };

    const handleEditAcivity = async (activity: IActivity) => {
        setSubmitting(true)
        await agent.Activities.update(activity)
        setActivities([
            ...activities.filter(a => a.id !== activity.id),
            activity
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false)

    };

    const handleDeleteActivity = async (event: SyntheticEvent<HTMLButtonElement> ,id: string) => {
        setSubmitting(true)
        setTarget(event.currentTarget.name)
        await agent.Activities.delete(id)
        setActivities([...activities.filter(a => a.id !== id)]);
        setSubmitting(false)

    };

    React.useEffect(() => {
        activityStore.loadActivities()
    }, [activityStore]); //need to specify dependencies in the brackers for useEffect to work

    if(activityStore.loadingInitial) return <LoadingComponent content='Loading activities...'/>

    return (
        <React.Fragment>
            <NavBar openCreateForm={handleOpenCreateForm} />
            <Container style={{ marginTop: '7em' }}>
                <ActivityDashboard
                    activities={activityStore.activities}
                    selectActivity={handleSelectActivity}
                    selectedActivity={selectedActivity}
                    editMode={editMode}
                    setEditMode={setEditMode}
                    setSelectedActivity={setSelectedActivity}
                    createActivity={handleCreateActivity}
                    editActivity={handleEditAcivity}
                    deleteActivity={handleDeleteActivity}
                    submitting={submitting}
                    target={target}
                />
            </Container>
        </React.Fragment>
    );
};

export default observer(App);
