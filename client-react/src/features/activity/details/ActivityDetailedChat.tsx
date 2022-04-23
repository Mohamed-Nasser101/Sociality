import {observer} from 'mobx-react-lite'
import {Segment, Header, Comment, Button, Loader} from 'semantic-ui-react'
import {useEffect} from "react";
import {useStore} from "../../../stores/store";
import {Link} from "react-router-dom";
import {Formik, Form, Field, FieldProps} from 'formik';
import * as Yup from 'yup';
import {formatDistanceToNow} from "date-fns";

interface Props {
  activityId: string;
}

const ActivityDetailedChat = ({activityId}: Props) => {
  const {commentStore: {comments, startConnection, stopConnection, addComment}} = useStore();
  useEffect(() => {
    if (activityId)
      startConnection(activityId);

    return () => stopConnection();
  }, [stopConnection, startConnection, activityId]);

  return (
    <>
      <Segment textAlign='center' attached='top' inverted color='teal' style={{border: 'none'}}>
        <Header>Chat about this event</Header>
      </Segment>
      <Segment attached clearing>
        
        <Formik
          onSubmit={(values, {resetForm}) => addComment(values).then(() => resetForm())}
          validationSchema={Yup.object({body: Yup.string().required()})}
          initialValues={{body: ''}}>
          {({handleSubmit, isSubmitting, isValid}) => (
            <Form className='ui form'>
              <Field name='body'>
                {(props: FieldProps) => (
                  <div style={{position: 'relative'}}>
                    <Loader active={isSubmitting}/>
                    <textarea
                      placeholder='Enter your comment'
                      {...props.field} rows={2}
                      onKeyPress={e => {
                        if (e.key === 'Enter' && e.shiftKey) {
                          return;
                        }
                        if (e.key === 'Enter' && !e.shiftKey) {
                          isValid && handleSubmit();
                        }
                      }}
                    />
                  </div>
                )}
              </Field>
            </Form>
          )}
        </Formik>
        
        <Comment.Group>
          {comments.map(comment => (
            <Comment key={comment.id}>
              <Comment.Avatar src={comment.image || '/assets/user.png'}/>
              <Comment.Content>
                <Comment.Author as={Link} to={`/profiles/${comment.username}`}>{comment.displayName}</Comment.Author>
                <Comment.Metadata>
                  <div>{formatDistanceToNow(comment.createdAt)} ago</div>
                </Comment.Metadata>
                <Comment.Text style={{whiteSpace: 'pre-wrap'}}>{comment.body}</Comment.Text>
              </Comment.Content>
            </Comment>
          ))}
          
        </Comment.Group>
      </Segment>
    </>
  )
}

export default observer(ActivityDetailedChat);
