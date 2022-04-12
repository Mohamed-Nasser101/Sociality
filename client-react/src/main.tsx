import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/layout/App'
import {store, StoreContext} from "./stores/store";
import {BrowserRouter, history} from "./browserRouter/BrowserRouter";

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <BrowserRouter history={history}>
      <App/>
    </BrowserRouter>
  </StoreContext.Provider>,
  document.getElementById('root')
)
