import {Profile} from "../../models/Profile";
import {Card, Header, Icon, Image} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {useMemo} from "react";

interface Props {
  profile: Profile;
}

const ProfileCard = ({profile}: Props) => {
  const {bio, image, username} = profile;
  const truncateBio = useMemo(() => {
    if (bio) {
      return bio.length > 40 ? bio.substring(0, 37) + '...' : bio
    }
  }, [bio])
  return (
    <Card as={Link} to={`/profiles/${username}`}>
      <Image src={image || '/assets/user.png'}/>
      <Card.Content>
        <Header>{profile.displayName}</Header>
        <Card.Description>{truncateBio}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name='user'/>
        10 followers
      </Card.Content>
    </Card>
  );
}

export default ProfileCard;