import React from 'react';
import PropTypes from 'prop-types';
import './Main.css';
// import CreateFlyer from '../CreateFlyer/CreateFlyer';
// import Dashboard from '../Dashboard/Dashboard';
// import Forum from '../Forum/Forum';


export default function Main({ component }) {
  return(
    <div className="Main">
      { component }
    </div>
  )
}

Main.propTypes = {

  component: PropTypes.objectOf(function(propValue, key, componentName, location, propFullName) {
    if (!["Dashboard", "Forum", "CreateFlyer"].includes(propValue.type.name) ) {
      return new Error(`Bad component prop: ${propValue.type.name}. Pass one of the following: "Dashboard", "Forum", "CreateFlyer"`)
    }
  })
}


