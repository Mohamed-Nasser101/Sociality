import {FC} from "react";

interface Props {
  when: boolean
}

const IF: FC<Props> = ({children, when}) => {
  return (
    <>
      {when && children}
    </>
  );

}

export default IF;