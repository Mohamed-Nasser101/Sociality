import {useField} from "formik";
import {Form, Label} from "semantic-ui-react";
import IF from "../IF";
import Datepicker, {ReactDatePickerProps} from 'react-datepicker';

const DateInput = (props: Partial<ReactDatePickerProps>) => {
  const [field, meta, helpers] = useField(props.name!);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <Datepicker
        {...field}
        {...props}
        selected={field.value && new Date(field.value) || null}
        onChange={value => helpers.setValue(value)}
      />
      <IF when={meta.touched && !!meta.error}>
        <Label basic color='red'>{meta.error}</Label>
      </IF>
    </Form.Field>
  );
}

export default DateInput;