import {observer} from 'mobx-react-lite';
import {Button, Header, Item, Segment, Image, Label} from 'semantic-ui-react'
import {Activity} from "../../../models/Activity";
import {Link} from "react-router-dom";
import {format} from 'date-fns';
import IF from "../../../app/common/IF";
import {useStore} from "../../../stores/store";

const activityImageStyle = {
  filter: 'brightness(30%)'
};

const activityImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white'
};

interface Props {
  activity: Activity
}

const ActivityDetailedHeader = ({activity}: Props) => {
  const {activityStore: {submitting, updateAttendance, toggleCancelActivity}} = useStore();
  return (
    <Segment.Group>
      <Segment basic attached='top' style={{padding: '0'}}>
        <IF when={activity.isCancelled}>
          <Label style={{position: 'absolute', zIndex: 1000, left: -14, top: 20}} ribbon color='red'
                 content='Cancelled'/>
        </IF>
        <Image src={`/assets/categoryImages/${activity.category}.jpg`} fluid style={activityImageStyle}/>
        <Segment style={activityImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={activity.title}
                  style={{color: 'white'}}
                />
                <p>{format(activity.date!, 'dd MM yyyy')}</p>
                <p>
                  Hosted by <strong>
                  <Link to={`/profiles/${activity.host?.username}`}>{activity.host?.displayName}</Link>
                </strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached='bottom'>
        <IF when={activity.isHost}>
          <Button
            color={activity.isCancelled ? 'green' : 'red'}
            floated='left'
            basic
            onClick={toggleCancelActivity}
            loading={submitting}
            content={activity.isCancelled ? 'Activate' : 'Cancel'}
          />
          <IF when={!activity.isCancelled}>
            <Button as={Link} to={`/manage/${activity.id}`} color='orange' floated='right'>
              Manage Event
            </Button>
          </IF>
        </IF>
        <IF when={!activity.isHost && !activity.isGoing}>
          <Button loading={submitting} onClick={updateAttendance} disabled={activity.isCancelled} color='teal'>Join
            Activity</Button>
        </IF>
        <IF when={!activity.isHost && activity.isGoing}>
          <Button loading={submitting} onClick={updateAttendance} disabled={activity.isCancelled}>Cancel
            attendance</Button>
        </IF>
      </Segment>
    </Segment.Group>
  )
}

export default observer(ActivityDetailedHeader);