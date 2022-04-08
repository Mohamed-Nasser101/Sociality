import 'semantic-ui-css/semantic.min.css';
import {Fragment, useEffect, useState} from "react";
import axios from "axios";
import {Activity} from "../../models/Activity";
import {Container, Header, List} from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activity/dashboard/ActivityDashboard";
import {v4 as uuid} from 'uuid';

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        axios.get<Activity[]>('http://localhost:5000/api/Activities')
            .then(res => setActivities(res.data));
    }, []);

    const handleSelectedActivity = (id: string) => {
        const activity = activities.find(a => a.id === id);
        setSelectedActivity(activity);
    }

    const handleCancelSelectedActivity = () => {
        setSelectedActivity(undefined);
    }

    const handleFormOpen = (id?: string) => {
        id ? handleSelectedActivity(id) : handleCancelSelectedActivity();
        setEditMode(true);
    }

    const handleFormClose = () => {
        setEditMode(false);
    }

    const handleEditOrCreateActivity = (activity: Activity) => {
        console.log(activity)
        setActivities(activities => activity.id
            ? [...activities.filter(a => a.id !== activity.id), activity]
            : [...activities, {...activity, id: uuid()}]);
        setEditMode(false);
        setSelectedActivity(activity);
    }
    const handleDeleteActivity = (id: string) => {
        setActivities(activities => [...activities.filter(a => a.id !== id)]);
    }

    return (
        <Fragment>
            <NavBar onOpenForm={handleFormOpen}/>
            <Container style={{marginTop: '7em'}}>
                <ActivityDashboard
                    activities={activities}
                    selectedActivity={selectedActivity}
                    onSelectActivity={handleSelectedActivity}
                    onCancelActivity={handleCancelSelectedActivity}
                    editMode={editMode}
                    onFormOpen={handleFormOpen}
                    onFormClose={handleFormClose}
                    onEditOrCreate={handleEditOrCreateActivity}
                    onDeleteActivity={handleDeleteActivity}
                />
            </Container>
        </Fragment>
    )
}

export default App
