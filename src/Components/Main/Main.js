import React from 'react';
import PropTypes from 'prop-types';
import CreateFlyer from '../CreateFlyer/CreateFlyer';
import Dashboard from '../Dashboard/Dashboard';
import Forum from '../Forum/Forum';


export default function Main(props) {
  console.log("pRops main", props.component.type.name)
  return(
    <div className="Main">
      {props.component}
    </div>
  )
}

Main.propTypes = {
  // component: PropTypes.oneOf([
  //   // PropTypes.instanceOf(Dashboard),
  //   // PropTypes.instanceOf(Forum),
  //   // PropTypes.instanceOf(CreateFlyer),
  //   <Dashboard />,
  //   <Forum />,
  //   <CreateFlyer />
  // ])
  // component: PropTypes.element
  component: PropTypes.objectOf(function(propValue, key, componentName, location, propFullName) {
    if (!["Dashboard", "Forum", "CreateFlyer"].includes(propValue.type.name) ) {
      return new Error(`OOPS NOT RIGHT ${propValue.type.name}`)
    }
  })
}


