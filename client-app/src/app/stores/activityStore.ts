import {observable, action} from 'mobx'
import { createContext } from 'react'
import { IActivity } from '../interfaces/IActivity'
import agent from '../api/agent';

class ActivityStore {
    @observable activities: IActivity[] = []
    @observable selectedActivity: IActivity | undefined;
    @observable loadingInitial = false;
    @observable editMode = false;

    //it is ok to modify state in mobx and common to
    @action loadActivities = async () => {
        this.loadingInitial = true;
        const activityList  = await agent.Activities.list();
        activityList.forEach(activity => {
            activity.date = activity.date.split('.')[0];
            this.activities.push(activity)
        });
        this.loadingInitial = false
    }

    @action selectActivity = (id: string) => {
        this.selectedActivity = this.activities.find(a=> a.id === id);
        this.editMode = false;
    }
}

//new adds this to context
export default createContext(new ActivityStore)