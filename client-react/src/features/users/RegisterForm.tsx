import {ErrorMessage, Form, Formik, FormikHelpers} from 'formik';
import TextInput from "../../app/common/form/TextInput";
import {Button, Header} from "semantic-ui-react";
import {useStore} from "../../stores/store";
import {observer} from "mobx-react-lite";
import {UserFormValues} from "../../models/user";
import * as Yup from "yup";
import ValidationErrors from "../errors/ValidationErrors";

const RegisterForm = () => {
  const {userStore} = useStore();

  const validation = Yup.object({
    email: Yup.string().required('email is required').email(),
    password: Yup.string().required('password is required'),
    displayName: Yup.string().required('password is required'),
    username: Yup.string().required('password is required'),
  });

  const handleUserRegister = (user: UserFormValues, helpers: FormikHelpers<any>) => {
    userStore.register(user)
      .catch(err => {
        console.log(err)
        helpers.setErrors({error: err});
        helpers.setSubmitting(false);
      });
  }
  return (
    <Formik
      initialValues={{displayName: '', username: '', email: '', password: '', error: null}}
      validationSchema={validation}
      onSubmit={handleUserRegister}
    >
      {({handleSubmit, isSubmitting, isValid, errors}) => (
        <Form className='ui form error' onSubmit={handleSubmit}>
          <Header as='h2' color='teal' textAlign='center' content='Sign up To Sociality'/>
          <TextInput placeholder='username' name='username'/>
          <TextInput placeholder='Display Name' name='displayName'/>
          <TextInput placeholder='Email' name='email'/>
          <TextInput type='password' placeholder='Password' name='password'/>
          <ErrorMessage name='error' render={() =>
            <ValidationErrors errors={errors.error}/>
          }/>
          <Button disabled={!isValid} loading={isSubmitting} content='register' type='submit' positive fluid/>
        </Form>
      )}
    </Formik>
  );
}

export default observer(RegisterForm);