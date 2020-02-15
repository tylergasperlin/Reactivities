import { IActivity } from '../../app/interfaces/IActivity';


export interface IPropsDetails {
    activity: IActivity| null;
    selectActivity: (id: string) => void;
    setEditMode: (editmode: boolean) => void;
}
