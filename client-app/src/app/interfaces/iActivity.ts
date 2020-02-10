
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
    selectedActivity: iActivity| null;

}

export interface iPropsDetails {
    activity: iActivity| null;

}

export interface iPropsActivity {
    activities: iActivity[];
    selectActivity: (id: string) => void;


}