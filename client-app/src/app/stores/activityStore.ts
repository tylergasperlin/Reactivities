import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IActivity } from '../interfaces/IActivity';
import { Activities } from '../api/agent';
import { history } from '../..';
import { toast } from 'react-toastify';
import { RootStore } from './rootStore';
//this makes it so you can only modify state within action decorators
configure({ enforceActions: 'always' });
export default class ActivityStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }
    //es6 map  = react to change in entry and additiona and removal
    //allows you to easily turn arra into object
    @observable activityRegistry = new Map();
    @observable activity: IActivity | null = null;
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable target = '';
    //put dates in order
    @computed get activitiesByDate() {
        //Array from values returns an iterable of values from the map
        return this.groupactivitiesByDate(Array.from(this.activityRegistry.values()))
    }

    groupactivitiesByDate(activities: IActivity[]) {
        const sortedActivities = activities.sort(
            (a, b) => a.date.getTime() - b.date.getTime()
            
        )
        
        return Object.entries(sortedActivities.reduce((activities, activity) => {
            const date = activity.date.toISOString().split('T')[0];
            activities[date] = activities[date] ? [...activities[date], activity] : [activity]
            return activities;
        }, {} as {[key:string] : IActivity[]})) //second {} means we start with empty object
    }

    //it is ok to modify state in mobx and common to
    @action loadActivities = async () => {
        try {
            //this works in strict mode because it comes before the await call
            this.loadingInitial = true;
            const activityList = await Activities.list();
            //since we run in strict we must use runInaction
            //loading activities is optional but is helpful with dev tools
            runInAction('loading activities', () => {
                activityList.forEach(activity => {
                    activity.date = new Date(activity.date);
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

    @action editActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await Activities.update(activity);
            runInAction('Editing activity', () => {
                this.activityRegistry.set(activity.id, activity);
                this.activity = activity;
                this.submitting = false;
            });
            history.push(`/activities/${activity.id}`)
        } catch (error) {
            runInAction('Editing activity error', () => {
                this.submitting = false;
            });
            toast.error('Problem submitting data')
            console.log(error.response);
        }
    };

    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await Activities.create(activity);
            runInAction('Creating activity', () => {
                this.activityRegistry.set(activity.id, activity);
                this.submitting = false;
            });
            history.push(`/activities/${activity.id}`)
        } catch (error) {
            runInAction('Creating activity failed', () => {
                this.submitting = false;
            });
            toast.error('Problem submitting data')
            console.log(error.response);
        }
    };

    @action loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.activity = activity;
            return activity;
        } else {
            this.loadingInitial = true;
            try {
                activity = await Activities.details(id);
                runInAction('Getting activity', () => {
                    activity.date = new Date(activity.date)
                    this.activity = activity;
                    this.activityRegistry.set(activity.id, activity);
                    this.loadingInitial = false;
                });
                return activity;
            } catch (error) {
                runInAction('Get activity error', () => {
                    this.loadingInitial = false;
                });
                //this throws the error from ts for another component to
                console.log(error.response)
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
            await Activities.delete(id);
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

}