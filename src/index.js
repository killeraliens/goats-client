import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom';

ReactDOM.render(
<BrowserRouter>
    <Route path="/" component={App}>
      {/* <IndexRoute component={Landing} /> */}
    </Route>
  <App />
</BrowserRouter>, document.getElementById('root'))



