import {Card, Button, Image} from "semantic-ui-react";
import {useStore} from "../../../stores";
import {observer} from "mobx-react-lite";
import {Link, useParams} from "react-router-dom";
import {useEffect} from "react";
import Loading from "../../../app/layout/Loading";

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
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`}/>
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>
          {activity.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths='2'>
          <Button as={Link} to={`/manage/${activity.id}`} basic color='blue' content='Edit'/>
          <Button as={Link} to='/activities' basic color='grey' content='Cancel'/>
        </Button.Group>
      </Card.Content>
    </Card>
  );

}

export default observer(ActivityDetails);