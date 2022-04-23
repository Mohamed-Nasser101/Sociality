import {useField} from "formik";
import {Form, Label} from "semantic-ui-react";
import IF from "../IF";

interface Props {
  placeholder: string;
  name: string;
  rows: number;
  label?: string;
}

const AreaInput = (props: Props) => {
  const [field, meta] = useField(props.name);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <textarea
        {...field}{...props}
      />
      <IF when={meta.touched && !!meta.error}>
        <Label basic color='red'>{meta.error}</Label>
      </IF>
    </Form.Field>
  );
}

export default AreaInput;