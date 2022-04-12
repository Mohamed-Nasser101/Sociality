import {Button, Form, Segment} from 'semantic-ui-react';
import {Activity} from '../../../models/Activity';
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {useStore} from "../../../stores/store";
import {observer} from "mobx-react-lite";
import {Link, useNavigate, useParams} from "react-router-dom";
import Loading from "../../../app/layout/Loading";
import {v4 as uuid} from 'uuid';

const InitialState = {
  id: '',
  category: '',
  venue: '',
  city: '',
  description: '',
  date: '',
  title: ''
};

const ActivityForm = () => {
  const {activityStore} = useStore();
  const navigate = useNavigate();
  const {id} = useParams();
  const [activity, setActivity] = useState<Activity>(InitialState);
  useEffect(() => {
    if (id) {
      activityStore.loadActivity(id).then(data => setActivity(data!))
    } else {
      setActivity(InitialState);
    }

  }, [id, activityStore.loadActivity]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setActivity((activity) => ({
      ...activity,
      [name]: value
    }));
  }

  const handleSubmit = (e: FormEvent) => {
    // e.preventDefault();
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
      <Form onSubmit={handleSubmit} autocompelte='off'>
        <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}/>
        <Form.TextArea placeholder='Description' value={activity.description} name='description'
                       onChange={handleInputChange}/>
        <Form.Input placeholder='Category' value={activity.category} name='category'
                    onChange={handleInputChange}/>
        <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleInputChange}/>
        <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange}/>
        <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange}/>
        <Button loading={activityStore.submitting} floated='right' positive type='submit' content='Submit'/>
        <Button as={Link} to='/activities' floated='right' type='button' content='Cancel'/>
      </Form>
    </Segment>
  );
}
export default observer(ActivityForm);