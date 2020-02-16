import {observable, action, computed} from 'mobx'
import { createContext } from 'react'
import { IActivity } from '../interfaces/IActivity'
import agent from '../api/agent';

class ActivityStore {
    //es6 map  = react to change in entry and additiona and removal
    //allows you to easily turn arra into object
    @observable activityRegistry = new Map()
    @observable activities: IActivity[] = []
    @observable selectedActivity: IActivity | undefined;
    @observable loadingInitial = false;
    @observable editMode = false;
    @observable submitting = false;
    //put dates in order
    @computed get activitiesByDate() {
        //Array from values returns an iterable of values from the map
        return Array.from(this.activityRegistry.values()).sort((a,b) => Date.parse(a.date) - Date.parse(b.date))
    }

    //it is ok to modify state in mobx and common to
    @action loadActivities = async () => {
        this.loadingInitial = true;
        const activityList  = await agent.Activities.list();
        activityList.forEach(activity => {
            activity.date = activity.date.split('.')[0];
            //turns the array into an object with key activity.id 
            this.activityRegistry.set(activity.id, activity)
        });
        this.loadingInitial = false
    }

    @action selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id)
        this.editMode = false;
    }

    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;
        try{
            await agent.Activities.create(activity)
            this.activityRegistry.set(activity.id, activity)
            this.editMode = false;
            this.submitting = false
        } catch (error) {
            this.submitting = false
            console.log(error)
        }
    }

    @action openCreateForm = () => {
        this.editMode = true;
        this.selectedActivity = undefined;
    }
}

//new adds this to context
export default createContext(new ActivityStore)