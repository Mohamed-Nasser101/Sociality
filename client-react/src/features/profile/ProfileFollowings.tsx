import {observer} from "mobx-react-lite";
import {useStore} from "../../stores/store";
import ProfileCard from "./ProfileCard";
import {Card, Grid, Header, Tab} from "semantic-ui-react";

interface Props {

}

const ProfileFollowings = ({}: Props) => {
  const {profileStore: {profile, loadingFollowing, followings, activeTab}} = useStore();

  return (
    <Tab.Pane loading={loadingFollowing}>
      <Grid>
        <Grid.Column width='16'>
          <Header
            floated='left'
            icon='user'
            content={activeTab === 3 ? `People following ${profile!.displayName}` : `${profile?.displayName} is following`}
          />
        </Grid.Column>
        <Grid.Column width='16'>
          <Card.Group itemsPerRow={4}>
            {followings.map(profile => (
              <ProfileCard key={profile.username} profile={profile}/>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}

export default observer(ProfileFollowings);