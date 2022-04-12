import {Dimmer, Loader} from "semantic-ui-react";
import ReactDOM from "react-dom";

interface Props {
  inverted?: boolean;
  content?: string;
}

const LoadingPortal = ({inverted, content}: Props) => {
  return (
    <Dimmer active={true} inverted={inverted}>
      <Loader content={content}/>
    </Dimmer>
  );

}

const Loading = ({inverted = true, content = 'loading...'}: Props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <LoadingPortal inverted={inverted} content={content}/>,
        document.getElementById('loading-root')!)}
    </>
  );

}

export default Loading;