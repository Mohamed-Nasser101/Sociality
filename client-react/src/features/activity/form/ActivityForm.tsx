import {Button, Header, Segment} from 'semantic-ui-react';
import {Activity} from '../../../models/Activity';
import {useEffect, useState} from "react";
import {useStore} from "../../../stores/store";
import {observer} from "mobx-react-lite";
import {Link, useNavigate, useParams} from "react-router-dom";
import Loading from "../../../app/layout/Loading";
import {v4 as uuid} from 'uuid';
import {Formik, Form} from "formik";
import TextInput from "../../../app/common/form/TextInput";
import AreaInput from "../../../app/common/form/AreaInput";
import SelectInput from "../../../app/common/form/SelectInput";
import {categoryOptions} from "../../../app/common/options/categoryOptions";

const InitialState = {
  id: '',
  category: '',
  venue: '',
  city: '',
  description: '',
  date: null,
  title: ''
};

const ActivityForm = () => {
  const [activity, setActivity] = useState<Activity>(InitialState);
  const {activityStore} = useStore();
  const navigate = useNavigate();
  const {id} = useParams();
  useEffect(() => {
    if (id) {
      activityStore.loadActivity(id).then(data => setActivity(data!))
    } else {
      setActivity(InitialState);
    }

  }, [id, activityStore.loadActivity]);

  const handleFormSubmit = (activity: Activity) => {
    if (activity.id) {
      activityStore.updateActivity(activity).then(_ => {
        navigate(`/activities/${activity.id}`);
      });
    } else {
      const newActivity = {...activity, id: uuid()}
      activityStore.createActivity(newActivity).then(_ => {
        navigate(`/activities/${newActivity.id}`);
      });
    }
  }

  if (activityStore.initialLoading) {
    return <Loading/>
  }

  return (
    <Segment clearing>
      <Header content='Activity Details' sub color='teal'/>
      <Formik enableReinitialize initialValues={activity} onSubmit={handleFormSubmit}>
        {({handleSubmit, isValid, isSubmitting, dirty}) => (
          <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
            <TextInput placeholder='Title' name='title'/>
            <AreaInput rows={3} placeholder='Description' name='description'/>
            <SelectInput options={categoryOptions} placeholder='Category' name='category'/>
            <TextInput placeholder='Date' name='date'/>
            <Header content='Location Details' sub color='teal'/>
            <TextInput placeholder='City' name='city'/>
            <TextInput placeholder='Venue' name='venue'/>
            <Button
              disabled={!isValid || isSubmitting || !dirty}
              loading={activityStore.submitting}
              floated='right'
              positive
              type='submit'
              content='Submit'
            />
            <Button as={Link} to='/activities' floated='right' type='button' content='Cancel'/>
          </Form>
        )}
      </Formik>
    </Segment>
  );
}
export default observer(ActivityForm);