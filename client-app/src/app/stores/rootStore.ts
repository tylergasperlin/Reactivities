import ActivityStore from './activityStore';
import UserStore from './userStore';
import { createContext } from 'react';
import { configure } from 'mobx';

//this makes it so you can only modify state within action decorators
configure({ enforceActions: 'always' });
export class RootStore {
    activityStore: ActivityStore;
    userStore: UserStore;

    constructor(){
        this.activityStore = new ActivityStore(this);
        this.userStore = new UserStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());