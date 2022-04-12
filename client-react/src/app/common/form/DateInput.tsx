import {useField} from "formik";
import {Form, Label} from "semantic-ui-react";
import IF from "../IF";
// import Datepicker from 'react-datepicker';

interface Props {
  placeholder: string;
  name: string;
  label?: string;
}

const DateInput = (props: Props) => {
  const [field, meta] = useField(props.name);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <input {...field}{...props}/>
      <IF when={meta.touched && !!meta.error}>
        <Label basic color='red'>{meta.error}</Label>
      </IF>
    </Form.Field>
  );
}

export default DateInput;