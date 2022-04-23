import {ProfileValue} from "../../models/Profile";
import {Form, Formik} from 'formik'
import * as Yup from "yup";
import TextInput from "../../app/common/form/TextInput";
import AreaInput from "../../app/common/form/AreaInput";
import {Button} from "semantic-ui-react";
import {useStore} from "../../stores/store";
import {observer} from "mobx-react-lite";

interface Props {
  profile: ProfileValue;
  setEditMode: (edit: boolean) => void
}

const validation = Yup.object({
  displayName: Yup.string().required('display name is required'),
});

const ProfileForm = ({profile, setEditMode}: Props) => {
  const {profileStore: {loading, editProfile}} = useStore();

  const handleEditProfile = (profile: ProfileValue) => editProfile(profile).then(_ => setEditMode(false));

  return (
    <Formik validationSchema={validation} initialValues={profile} onSubmit={handleEditProfile}>
      {({handleSubmit, isValid, dirty, isSubmitting}) => (
        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
          <TextInput placeholder='Display Name' name='displayName'/>
          <AreaInput rows={3} placeholder='Bio' name='bio'/>
          <Button
            disabled={!isValid || isSubmitting || !dirty}
            loading={loading}
            floated='right'
            positive
            type='submit'
            content='Submit'
          />
          <Button
            floated='right' type='button' content='Cancel'
            onClick={() => setEditMode(false)}
          />
        </Form>
      )}
    </Formik>
  );
}

export default observer(ProfileForm);