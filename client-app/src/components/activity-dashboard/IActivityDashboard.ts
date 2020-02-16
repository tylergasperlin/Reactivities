import { IActivity } from '../../app/interfaces/IActivity';
import { SyntheticEvent } from 'react';


export interface IActivityDashboard {
    deleteActivity:(event: SyntheticEvent<HTMLButtonElement> ,activitiy: string) => void;
    submitting: boolean;
    target: string

}