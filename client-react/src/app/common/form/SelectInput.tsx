import {useField} from "formik";
import {Form, Label, Select} from "semantic-ui-react";
import IF from "../IF";

interface Props {
  placeholder: string;
  name: string;
  options: any;
  label?: string;
}

const SelectInput = (props: Props) => {
  const [field, meta, helpers] = useField(props.name);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <Select
        options={props.options}
        clearable
        value={field.value || null}
        onChange={(e, d) => helpers.setValue(d.value)}
        onBlur={() => helpers.setTouched(true)}
        placeholder={props.placeholder}
      />
      <IF when={meta.touched && !!meta.error}>
        <Label basic color='red'>{meta.error}</Label>
      </IF>
    </Form.Field>
  );
}

export default SelectInput;