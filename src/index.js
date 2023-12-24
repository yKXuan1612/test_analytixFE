import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {ToastContainer} from "react-toastify";
import {IndexRouter} from "./routers/IndexRouter";
import 'react-toastify/dist/ReactToastify.css';
import {applyMiddleware, createStore} from "redux";
import reducers from "./redux/reducer";
import {thunk} from "redux-thunk";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(reducers, applyMiddleware(thunk));

root.render(
  <>
    <Provider store={store}>
        <IndexRouter />
        <ToastContainer />
    </Provider>
  </>
);

reportWebVitals();
