import {createBrowserHistory, History} from 'history'
import {BrowserRouterProps as NativeBrowserRouterProps, Router} from "react-router-dom";
import {FC, memo, useLayoutEffect, useState} from "react";

export interface BrowserRouterProps extends Omit<NativeBrowserRouterProps, "window"> {
  history: History;
}

export const history = createBrowserHistory();
export const BrowserRouter: FC<BrowserRouterProps> = memo(props => {
  const {history, ...restProps} = props;
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });
  useLayoutEffect(() => history.listen(setState), [history]);
  return <Router
    {...restProps}
    location={state.location}
    navigationType={state.action}
    navigator={history}
  />;
});
