import { IActivity } from '../../app/interfaces/IActivity';


export interface IActivityDetails {
    setSelectedActivity: (activity: IActivity | null) => void;
    setEditMode: (editmode: boolean) => void;
}
