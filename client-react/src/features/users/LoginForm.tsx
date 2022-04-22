import {ErrorMessage, Form, Formik, FormikHelpers} from 'formik';
import TextInput from "../../app/common/form/TextInput";
import {Button, Header, Label} from "semantic-ui-react";
import {useStore} from "../../stores/store";
import {observer} from "mobx-react-lite";
import {UserFormValues} from "../../models/user";
import * as Yup from "yup";

const LoginForm = () => {
  const {userStore} = useStore();

  const validation = Yup.object({
    email: Yup.string().required('email is required').email(),
    password: Yup.string().required('password is required'),
  });

  const handleUserLogin = (user: UserFormValues, helpers: FormikHelpers<any>) => {
    userStore.login(user)
      .catch(_ => {
        helpers.setErrors({error: 'invalid username or password'});
        helpers.setSubmitting(false);
      });
  }
  return (
    <Formik
      initialValues={{email: '', password: '', error: null}}
      validationSchema={validation}
      onSubmit={handleUserLogin}
    >
      {({handleSubmit, isSubmitting, isValid, dirty, errors}) => (
        <Form className='ui form' onSubmit={handleSubmit}>
          <Header as='h2' color='teal' textAlign='center' content='Login To Sociality'/>
          <TextInput placeholder='Email' name='email'/>
          <TextInput type='password' placeholder='Password' name='password'/>
          <ErrorMessage name='error' render={() =>
            <Label content={errors.error} basic color='red' style={{marginBottom: 10}}/>
          }/>
          <Button disabled={!isValid || !dirty} loading={isSubmitting} content='Login' type='submit' positive fluid/>
        </Form>
      )}
    </Formik>
  );
}

export default observer(LoginForm);