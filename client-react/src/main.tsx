import React from 'react'
import ReactDOM from 'react-dom'
import './app/layout/styles.css'
import App from './app/layout/App'
import {store, StoreContext} from "./stores";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </StoreContext.Provider>,
  document.getElementById('root')
)
