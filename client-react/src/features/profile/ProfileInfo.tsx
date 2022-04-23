import {Button, Grid, Header, Tab} from "semantic-ui-react";
import {Profile} from "../../models/Profile";
import {useStore} from "../../stores/store";
import IF from "../../app/common/IF";
import {useState} from "react";
import ProfileForm from "./ProfileForm";
import {observer} from "mobx-react-lite";

interface Props {
  profile: Profile;
}

const ProfileInfo = ({profile}: Props) => {
  const {profileStore: {isCurrentUser}} = useStore();
  const [editMode, setEditMode] = useState(false);
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='user' content={`About ${profile.username}`}/>
          <IF when={isCurrentUser}>
            <Button
              basic floated='right'
              content={editMode ? 'Cancel' : 'Edit Profile'}
              onClick={() => setEditMode(e => !e)}
            />
          </IF>
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode
            ? <ProfileForm profile={{displayName: profile.displayName, bio: profile.bio}} setEditMode={setEditMode}/>
            : <div style={{whiteSpace: 'pre-wrap', padding: '0 20px'}}>{profile.bio}</div>}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}

export default observer(ProfileInfo);