import ProfileHeader from "./ProfileHeader";
import {Grid} from "semantic-ui-react";
import ProfileContent from "./ProfileContent";
import {useParams} from "react-router-dom";
import {useStore} from "../../stores/store";
import {useEffect} from "react";
import Loading from "../../app/layout/Loading";
import {observer} from "mobx-react-lite";
import IF from "../../app/common/IF";

const Profile = () => {
  const {username} = useParams();
  const {profileStore: {profile, isLoading, loadProfile}} = useStore();
  useEffect(() => {
    if (username)
      loadProfile(username);

  }, [loadProfile, username]);
  if (isLoading) return <Loading content='Loading Profile...'/>
  return (
    <Grid>
      <Grid.Column width={16}>
        <IF when={!!profile}>
          <ProfileHeader profile={profile!}/>
          <ProfileContent profile={profile!}/>
        </IF>
      </Grid.Column>
    </Grid>
  );
}

export default observer(Profile);