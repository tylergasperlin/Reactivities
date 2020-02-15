import { IActivity } from '../../app/interfaces/IActivity';
import { SyntheticEvent } from 'react';


export interface IActivityDashboard {
    activities: IActivity[];
    selectActivity: (id: string) => void;
    selectedActivity: IActivity | null;
    editMode: boolean;
    setEditMode: (editmode: boolean)=>void;
    setSelectedActivity: (activity: IActivity) => void;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
    deleteActivity:(event: SyntheticEvent<HTMLButtonElement> ,activitiy: string) => void;
    submitting: boolean;
    target: string

}