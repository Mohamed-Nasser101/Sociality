import {Profile} from "../../models/Profile";
import {observer} from "mobx-react-lite";
import {Button, Reveal} from "semantic-ui-react";
import {useStore} from "../../stores/store";
import {SyntheticEvent} from "react";

interface Props {
  profile: Profile;
}

const FollowButton = ({profile}: Props) => {
  const {profileStore: {loading, updateFollowing}, userStore} = useStore();

  if (profile.username === userStore.user?.username) return null;

  const handleFollow = (e: SyntheticEvent, username: string) => {
    e.preventDefault();
    profile.following ? updateFollowing(username, false) : updateFollowing(username, true);
  }

  return (
    <Reveal animated='move'>
      <Reveal.Content visible style={{width: '100%'}}>
        <Button
          fluid color='teal'
          content={profile.following ? 'Following' : 'Not Following'}
        />
      </Reveal.Content>
      <Reveal.Content hidden style={{width: '100%'}}>
        <Button
          fluid basic loading={loading}
          onClick={e => handleFollow(e, profile.username)}
          color={profile.following ? 'red' : 'green'}
          content={profile.following ? 'Unfollow' : 'Follow'}
        />
      </Reveal.Content>
    </Reveal>
  );
}

export default observer(FollowButton);