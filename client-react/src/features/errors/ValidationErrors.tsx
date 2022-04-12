import {Message} from "semantic-ui-react";
import IF from "../../app/common/IF";

interface Props {
  errors: string[]
}

const ValidationErrors = ({errors}: Props) => {
  return (
    <Message error>
      <IF when={!!errors}>
        <Message.List>
          {errors.map((error, index) =>
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