import {Button, Icon, Item, Label, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {Activity} from "../../../models/Activity";
import {format} from "date-fns";
import ActivityListItemAttendee from "./ActivityListItemAttendee";
import IF from "../../../app/common/IF";

interface Props {
  activity: Activity
}

const ActivityListItem = ({activity}: Props) => {
  return (
    <Segment.Group>
      <Segment>
        <IF when={activity.isCancelled}>
          <Label attached='top' color='red' content='Cancelled' style={{textAlign: 'center'}}/>
        </IF>
        <Item.Group>
          <Item>
            <Item.Image style={{marginBottom: 3}} size='tiny' circular src='/assets/user.png'/>
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>Hosted by {activity.host?.displayName}</Item.Description>
              <IF when={activity.isHost}>
                <Item.Description>
                  <Label basic color='orange'>you are hosting this activity</Label>
                </Item.Description>
              </IF>
              <IF when={activity.isGoing && !activity.isHost}>
                <Item.Description>
                  <Label basic color='green'>you are going to this activity</Label>
                </Item.Description>
              </IF>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name='clock'/> {format(activity.date!, 'dd MM yyyy h:mm aa')}
          <Icon name='marker'/> {activity.venue}
        </span>
      </Segment>
      <Segment secondary>
        <ActivityListItemAttendee attendees={activity.attendees!}/>
      </Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          color='teal'
          floated='right'
          content='View'
        />
      </Segment>
    </Segment.Group>
  );
}

export default ActivityListItem;