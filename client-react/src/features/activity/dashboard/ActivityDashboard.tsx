import {Grid, List} from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import {useStore} from "../../../stores";
import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import Loading from "../../../app/layout/Loading";


const ActivityDashboard = () => {
  const {activityStore} = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore.loadActivity]);

  if (activityStore.initialLoading) {
    return <Loading content='Loading app'/>
  }

  return (
    <Grid>
      <Grid.Column width='10'>
        <List>
          <ActivityList/>
        </List>
      </Grid.Column>
      <Grid.Column width='6'>
        <h1>filters</h1>
      </Grid.Column>
    </Grid>
  );

}

export default observer(ActivityDashboard);