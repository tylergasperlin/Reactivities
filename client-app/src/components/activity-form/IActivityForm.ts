import { IActivity } from '../../app/interfaces/IActivity';



export interface IActivityForm {
    setEditMode: (editMode: boolean) => void;
    initialFormState: IActivity;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
    submitting: boolean

}