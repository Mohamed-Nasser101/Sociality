import {Message} from "semantic-ui-react";
import IF from "../../app/common/IF";

interface Props {
  errors: any
}

const ValidationErrors = ({errors}: Props) => {
  return (
    <Message error>
      <IF when={!!errors}>
        <Message.List>
          {errors.map((error: any, index: any) =>
            <Message.Item key={index}>
              {error}
            </Message.Item>
          )}
        </Message.List>
      </IF>
    </Message>
  );
}

export default ValidationErrors;