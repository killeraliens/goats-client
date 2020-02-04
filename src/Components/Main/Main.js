import React from 'react';
import PropTypes from 'prop-types';
import './Main.css';
// import CreateFlyer from '../CreateFlyer/CreateFlyer';
// import Dashboard from '../Dashboard/Dashboard';
// import Forum from '../Forum/Forum';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

export default function Main({ component }) {
  return(
    <div className="Main">
      <ScrollToTop component={component} >
      { component }
      </ScrollToTop>
    </div>
  )
}

Main.propTypes = {
  component: PropTypes.element
}


