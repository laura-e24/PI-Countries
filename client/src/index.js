import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux";
import store from "./redux/store/index";
import axios from 'axios';
import { fetchAllCountries } from './features/countries/countriesSlice';
import { fetchAllActivities } from './features/activities/activitiesSlice';

axios.defaults.baseURL = process.env.REACT_APP_API || 'http://localhost:3001'

store.dispatch(fetchAllCountries())
store.dispatch(fetchAllActivities())

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();