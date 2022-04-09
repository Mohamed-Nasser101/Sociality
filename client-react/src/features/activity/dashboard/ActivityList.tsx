import {Button, Item, Label, List, Segment} from "semantic-ui-react";
import {SyntheticEvent, useState} from "react";
import {useStore} from "../../../stores";
import agent from "../../../app/api/agent";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";


const ActivityList = () => {
  const [targetName, setTargetName] = useState('');
  const {activityStore} = useStore();

  const handleDeleteActivity = (id: string) => {
    activityStore.setSubmitting(true);
    agent.Activities.delete(id)
      .then(_ => {
        activityStore.setSubmitting(false);
        activityStore.deleteActivity(id);
      });
  }
  const handleDelete = (e: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setTargetName(e.currentTarget.name);
    handleDeleteActivity(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {activityStore.activitiesByDate.map(activity =>
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as='a'>{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>{activity.city} {activity.venue}</div>
              </Item.Description>
              <Item.Extra>
                <Button
                  as={Link} to={`/activities/${activity.id}`}
                  floated='right' content='View' color='blue'
                />
                <Button
                  name={activity.id}
                  loading={activityStore.submitting && activity.id === targetName}
                  onClick={e => handleDelete(e, activity.id)}
                  floated='right' content='Delete' color='red'
                />
                <Label basic content={activity.category}/>
              </Item.Extra>
            </Item.Content>
          </Item>
        )}
      </Item.Group>
    </Segment>
  );

}

export default observer(ActivityList);