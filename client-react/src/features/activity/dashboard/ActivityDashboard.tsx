import {Activity} from "../../../models/Activity";
import {Grid, List} from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface Props {
    activities: Activity[],
    selectedActivity: Activity | undefined;
    onSelectActivity: (id: string) => void;
    onCancelActivity: () => void;
    editMode: boolean;
    onFormOpen: (id: string) => void;
    onFormClose: () => void;
    onEditOrCreate: (activity: Activity) => void,
    onDeleteActivity: (id: string) => void
}

const ActivityDashboard = (
    {
        activities, onCancelActivity, onSelectActivity, selectedActivity,
        editMode, onFormClose, onFormOpen, onEditOrCreate, onDeleteActivity
    }: Props) => {
    return (
        <Grid>
            <Grid.Column width='10'>
                <List>
                    <ActivityList onSelectActivity={onSelectActivity} onDeleteActivity={onDeleteActivity}
                                  activities={activities}/>
                </List>
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityDetails
                    onCancelActivity={onCancelActivity}
                    activity={selectedActivity}
                    onOpenForm={onFormOpen}
                />
                {editMode &&
                    <ActivityForm onSubmit={onEditOrCreate} onCloseForm={onFormClose} activity={selectedActivity}/>}
            </Grid.Column>
        </Grid>
    );

}

export default ActivityDashboard;