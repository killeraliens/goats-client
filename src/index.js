import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import UseMeta from './UseMeta'

ReactDOM.render(
<BrowserRouter>
  {/* <UseMeta /> */}
  <App />
</BrowserRouter>, document.getElementById('root'))



