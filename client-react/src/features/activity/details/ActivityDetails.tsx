import {Grid} from "semantic-ui-react";
import {useStore} from "../../../stores/store";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import Loading from "../../../app/layout/Loading";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedHeader from "./ActivityDetaledHeader";


const ActivityDetails = () => {
  const {id} = useParams<{ id: string }>();
  const {activityStore} = useStore();
  const activity = activityStore.selectedActivity;
  useEffect(() => {
    if (id) {
      activityStore.loadActivity(id);
    }
  }, [id, activityStore.loadActivity]);

  if (activityStore.initialLoading || !activity) {
    return <Loading content='Loading Activity'/>;
  }
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader activity={activity}/>
        <ActivityDetailedInfo activity={activity}/>
        <ActivityDetailedChat/>
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailedSidebar/>
      </Grid.Column>
    </Grid>
  );

}

export default observer(ActivityDetails);