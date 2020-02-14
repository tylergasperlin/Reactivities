
//use interface when you want typechecking only //othersise class is appropriate
export interface iActivity {
    id: string;
    title: string;
    description: string;
    category: string;
    date: string;
    city: string;
    venue: string;
}

export interface iPropsDashboard {
    activities: iActivity[];
    selectActivity: (id: string) => void;
    selectedActivity: iActivity | null;
    editMode: boolean;
    setEditMode: (editmode: boolean)=>void;
    setSelectedActivity: (activity: iActivity) => void;
    createActivity: (activity: iActivity) => void;
    editActivity: (activity: iActivity) => void;
    deleteActivity:(activitiy: string) => void;

}

export interface iPropsDetails {
    activity: iActivity| null;
    selectActivity: (id: string) => void;
    setEditMode: (editmode: boolean) => void;
}

export interface iPropsActivityList {
    activities: iActivity[];
    selectActivity: (id: string) => void;
    deleteActivity:(activitiy: string) => void;

}