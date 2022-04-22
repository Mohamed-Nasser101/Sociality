import {Button, Header, Segment} from 'semantic-ui-react';
import {ActivityFormValues} from '../../../models/Activity';
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
import * as Yup from 'yup'
import DateInput from "../../../app/common/form/DateInput";

const ActivityForm = () => {
  const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());
  const {activityStore} = useStore();
  const {loadActivity, createActivity, updateActivity, submitting, initialLoading} = activityStore;
  const navigate = useNavigate();
  const {id} = useParams();
  useEffect(() => {
    if (id) {
      loadActivity(id).then(data => setActivity(new ActivityFormValues(data!)));
    } else {
      setActivity(new ActivityFormValues(activity));
    }

  }, [id, loadActivity]);

  const validation = Yup.object({
    title: Yup.string().required('title is required'),
    description: Yup.string().required('description is required'),
    city: Yup.string().required(),
    venue: Yup.string().required(),
    date: Yup.string().required().nullable(),
    category: Yup.string().required()
  });

  const handleFormSubmit = (activity: ActivityFormValues) => {
    if (activity.id) {
      updateActivity(activity).then(_ => {
        navigate(`/activities/${activity.id}`);
      });
    } else {
      const newActivity = {...activity, id: uuid()}
      createActivity(newActivity).then(_ => {
        navigate(`/activities/${newActivity.id}`);
      });
    }
  }

  if (initialLoading) {
    return <Loading/>
  }

  return (
    <Segment clearing>
      <Header content='Activity Details' sub color='teal'/>
      <Formik enableReinitialize validationSchema={validation} initialValues={activity} onSubmit={handleFormSubmit}>
        {({handleSubmit, isValid, isSubmitting, dirty}) => (
          <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
            <TextInput placeholder='Title' name='title'/>
            <AreaInput rows={3} placeholder='Description' name='description'/>
            <SelectInput options={categoryOptions} placeholder='Category' name='category'/>
            <DateInput
              placeholderText='Date'
              name='date'
              showTimeSelect
              timeCaption='time'
              dateFormat='MMMM d, yyyy h:mm aa'
            />
            <Header content='Location Details' sub color='teal'/>
            <TextInput placeholder='City' name='city'/>
            <TextInput placeholder='Venue' name='venue'/>
            <Button
              disabled={!isValid || isSubmitting || !dirty}
              loading={submitting}
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