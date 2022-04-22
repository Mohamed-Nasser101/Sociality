import {Photo, Profile} from "../../models/Profile";
import {Button, Card, Grid, Header, Image, Tab} from "semantic-ui-react";
import {observer} from "mobx-react-lite";
import {useStore} from "../../stores/store";
import {SyntheticEvent, useState} from "react";
import IF from "../../app/common/IF";
import PhotoUploadWidget from "../../app/common/photoUpload/PhotoUploadWidget";

interface Props {
  profile: Profile
}

const ProfilePhotos = ({profile}: Props) => {
  const {profileStore: {isCurrentUser, upLoading, uploadPhoto, setMainPhoto, loading, deletePhoto}} = useStore();
  const [addPhotoMode, setAddPhotoMode] = useState(false);
  const [target, setTarget] = useState('');
  const handlePhotoUpload = (file: Blob) => {
    uploadPhoto(file).then(_ => setAddPhotoMode(false));
  }

  const handleMainPhoto = (photo: Photo, e: SyntheticEvent<HTMLButtonElement>) => {
    setTarget(e.currentTarget.name);
    setMainPhoto(photo);
  }

  const handleDeletePhoto = (photo: Photo, e: SyntheticEvent<HTMLButtonElement>) => {
    setTarget(e.currentTarget.name);
    deletePhoto(photo);
  }

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='image' content='Photos'/>
          <IF when={isCurrentUser}>
            <Button
              content={addPhotoMode ? 'Cancel' : 'Add Photo'}
              onClick={() => setAddPhotoMode((s) => !s)}
              floated='right'
              basic
            />
          </IF>
        </Grid.Column>
        <Grid.Column width={16}>
          <IF when={addPhotoMode}>
            <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={upLoading}/>
          </IF>
          <IF when={!addPhotoMode}>
            <Card.Group itemsPerRow={5}>
              {profile.photos?.map(photo =>
                <Card key={photo.id}>
                  <Image src={photo.url}></Image>
                  <IF when={isCurrentUser}>
                    <Button.Group fluid widths={2}>
                      <Button basic color='green' content='Main'
                              name={photo.id} disabled={photo.isMain}
                              loading={target === photo.id && loading}
                              onClick={e => handleMainPhoto(photo, e)}
                      />
                      <Button basic color='red' icon='trash' name={`delete-${photo.id}`}
                              loading={target === `delete-${photo.id}` && loading}
                              disabled={photo.isMain}
                              onClick={e => handleDeletePhoto(photo, e)}
                      />
                    </Button.Group>
                  </IF>
                </Card>
              )}
            </Card.Group>
          </IF>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}

export default observer(ProfilePhotos);