import { SyntheticEvent } from 'react';
import { IActivity } from '../../app/interfaces/IActivity';


export interface IActivityList {
    activities: IActivity[];
    selectActivity: (id: string) => void;
    deleteActivity:(event: SyntheticEvent<HTMLButtonElement> ,activitiy: string) => void;
    submitting: boolean
    target: string


}