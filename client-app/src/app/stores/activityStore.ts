import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IActivity } from '../interfaces/IActivity';
import agent from '../api/agent';

//this makes it so you can only modify state within action decorators
configure({ enforceActions: 'always' });
class ActivityStore {
    //es6 map  = react to change in entry and additiona and removal
    //allows you to easily turn arra into object
    @observable activityRegistry = new Map();
    @observable activities: IActivity[] = [];
    @observable activity: IActivity | null = null;
    @observable loadingInitial = false;
    @observable editMode = false;
    @observable submitting = false;
    @observable target = '';
    //put dates in order
    @computed get activitiesByDate() {
        //Array from values returns an iterable of values from the map
        return Array.from(this.activityRegistry.values()).sort(
            (a, b) => Date.parse(a.date) - Date.parse(b.date)
        );
    }

    //it is ok to modify state in mobx and common to
    @action loadActivities = async () => {
        try {
            //this works in strict mode because it comes before the await call
            this.loadingInitial = true;
            const activityList = await agent.Activities.list();
            //since we run in strict we must use runInaction
            //loading activities is optional but is helpful with dev tools
            runInAction('loading activities', () => {
                activityList.forEach(activity => {
                    activity.date = activity.date.split('.')[0];
                    //turns the array into an object with key activity.id
                    this.activityRegistry.set(activity.id, activity);
                });
                //this caused error in strict mode so we need to run in action
                this.loadingInitial = false;
            });
        } catch (error) {
            //same here since we run in strict...
            runInAction('load activities error', () => {
                this.loadingInitial = false;
            });
        }
    };

    @action selectActivity = (id: string) => {
        this.activity = this.activityRegistry.get(id);
        this.editMode = false;
    };

    @action openEditForm = (id: string) => {
        this.selectActivity = this.activityRegistry.get(id);
        this.editMode = true;
    };

    @action cancelSelectedActivity = () => {
        this.activity = null;
    };

    @action cancelFormOpen = () => {
        this.editMode = false;
    };

    @action editActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.update(activity);
            runInAction('Editing activity', () => {
                this.activityRegistry.set(activity.id, activity);
                this.activity = activity;
                this.editMode = false;
                this.submitting = false;
            });
        } catch (error) {
            runInAction('Editing activity error', () => {
                this.submitting = false;
            });
            console.log(error);
        }
    };

    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.create(activity);
            runInAction('Creating activity', () => {
                this.activityRegistry.set(activity.id, activity);
                this.editMode = false;
                this.submitting = false;
            });
        } catch (error) {
            runInAction('Creating activity failed', () => {
                this.submitting = false;
            });
            console.log(error);
        }
    };

    @action loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.activity = activity;
        } else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                runInAction('Getting activity', () => {
                    this.activity = activity;
                    this.loadingInitial = false;
                });
            } catch (error) {
                runInAction('Get activity error', () => {
                    this.loadingInitial = false;
                });
                console.log(error);
            }
        }
    };

    @action clearActivity = () => {
        this.activity = null;
    };

    getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    };

    @action deleteActivity = async (
        event: SyntheticEvent<HTMLButtonElement>,
        id: string
    ) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await agent.Activities.delete(id);
            runInAction('Deleting activity', () => {
                this.activityRegistry.delete(id);
                this.submitting = false;
                this.target = '';
            });
        } catch (error) {
            runInAction('Deleting activity error', () => {
                this.submitting = false;
                this.target = '';
            });
            console.log(error);
        }
    };

    @action openCreateForm = () => {
        this.editMode = true;
        this.activity = null;
    };
}

//new adds this to context
export default createContext(new ActivityStore());
