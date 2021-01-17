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

const store = configureStore({ auth: { token } });

const userId = window.localStorage.getItem("ESENTIAL_USER_ID");
const userData = async () => {
  try {
    const request = await fetch(`http://localhost:5000/api/user/${userId}`);

    if (!request.ok) {
      throw request;
    }
    console.log(request);
  } catch (err) {
    console.error(err);
  }
}
userData();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
