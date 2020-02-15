import {observable, action} from 'mobx'
import { createContext } from 'react'
import { IActivity } from '../interfaces/IActivity'
import agent from '../api/agent';

class ActivityStore {
    @observable activities: IActivity[] = []
    @observable loadingInitial = false;

    //it is ok to modify state in mobx and common to
    @action loadActivities = async () => {
        this.loadingInitial = true;
        this.activities = await agent.Activities.list();
        this.activities.forEach(activity => {
            activity.date = activity.date.split('.')[0];
            this.activities.push(activity);
        });

        this.loadingInitial = false
    }
}

//new adds this to context
export default createContext(new ActivityStore)