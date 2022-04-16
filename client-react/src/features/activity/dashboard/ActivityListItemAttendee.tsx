import {Image, List, Popup} from "semantic-ui-react";
import {Profile} from "../../../models/Profile";
import {Link} from "react-router-dom";
import ProfileCard from "../../profile/ProfileCard";

interface Props {
  attendees: Profile[]
}

const ActivityListItemAttendee = ({attendees}: Props) => {
  return (
    <List horizontal>
      {attendees.map(attendee => (
        <Popup
          hoverable
          key={attendee.username}
          trigger={
            <List.Item key={attendee.username} as={Link} to={`/profiles/${attendee.username}`}>
              <Image src={attendee.image || '/assets/user.png'} circular size='mini'/>
            </List.Item>
          }>
          <Popup.Content>
            <ProfileCard profile={attendee}/>
          </Popup.Content>
        </Popup>
      ))}
    </List>
  );
}

export default ActivityListItemAttendee;