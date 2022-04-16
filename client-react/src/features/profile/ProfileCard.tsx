import {Profile} from "../../models/Profile";
import {Card, Header, Icon, Image} from "semantic-ui-react";
import {Link} from "react-router-dom";

interface Props {
  profile: Profile;
}

const ProfileCard = ({profile}: Props) => {
  return (
    <Card as={Link} to={`/profiles/${profile.username}`}>
      <Image src={profile.image || '/assets/user.png'}/>
      <Card.Content>
        <Header>{profile.displayName}</Header>
        <Card.Description>This is my bio</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name='user'/>
        10 followers
      </Card.Content>
    </Card>
  );
}

export default ProfileCard;