import { IActivity } from '../../app/interfaces/IActivity';



export interface IActivityForm {
    setEditMode: (editMode: boolean) => void;
    initialFormState: IActivity | null;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
    submitting: boolean

}