import React from 'react';
import ReactDOM from 'react-dom';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './index2.scss';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const token = window.localStorage.getItem("ESENTIAL_ACCESS_TOKEN");

const store = configureStore({ auth: { token } })

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
