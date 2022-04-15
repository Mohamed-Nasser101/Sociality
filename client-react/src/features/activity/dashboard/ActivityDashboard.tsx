import {Grid, List} from "semantic-ui-react";
import ActivityList from "./ActivityList";
import {useStore} from "../../../stores/store";
import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import Loading from "../../../app/layout/Loading";
import ActivityFilters from "./ActivityFilters";


const ActivityDashboard = () => {
  const {activityStore} = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore.loadActivity]);

  if (activityStore.initialLoading) {
    return <Loading content='Loading activities'/>
  }

  return (
    <Grid>
      <Grid.Column width='10'>
        <List>
          <ActivityList/>
        </List>
      </Grid.Column>
      <Grid.Column width='6'>
        <ActivityFilters/>
      </Grid.Column>
    </Grid>
  );

}

export default observer(ActivityDashboard);