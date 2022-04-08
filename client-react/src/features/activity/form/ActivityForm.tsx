import {Button, Form, Segment} from 'semantic-ui-react';
import {Activity} from '../../../models/Activity';
import {ChangeEvent, FormEvent, useState} from "react";

interface Props {
    activity: Activity | undefined;
    onCloseForm: () => void;
    onSubmit: (activity: Activity) => void;
}

const ActivityForm = ({activity: selectedActivity, onCloseForm, onSubmit}: Props) => {
    const InitialActivity = selectedActivity ?? {
        id: '',
        category: '',
        venue: '',
        city: '',
        description: '',
        date: '',
        title: ''
    };
    const [activity, setActivity] = useState(InitialActivity);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setActivity((activity) => ({
            ...activity,
            [name]: value
        }));
    }

    const handleSubmit = (e: FormEvent) => {
        // e.preventDefault();
        onSubmit(activity);
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autocompelte='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' value={activity.description} name='description'
                               onChange={handleInputChange}/>
                <Form.Input placeholder='Category' value={activity.category} name='category'
                            onChange={handleInputChange}/>
                <Form.Input placeholder='Date' value={activity.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange}/>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange}/>
                <Button floated='right' positive type='submit' content='Submit'/>
                <Button onClick={onCloseForm} floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    );
}
export default ActivityForm;