import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';
import {Provider} from "react-redux";
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import {reducers} from "./reducers";
import 'semantic-ui-css/semantic.min.css'
import SuccessModal from "./pages/SuccesModal";

const store = createStore(reducers, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App/>
    <SuccessModal/>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
