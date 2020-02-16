import { IActivity } from '../../app/interfaces/IActivity';



export interface IActivityForm {
    setEditMode: (editMode: boolean) => void;
    initialFormState: IActivity;
    editActivity: (activity: IActivity) => void;
    submitting: boolean

}