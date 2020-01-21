import React from 'react';
import PropTypes from 'prop-types';
import CreateFlyer from '../CreateFlyer/CreateFlyer';
import ProfilePg from '../ProfilePg';
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
  //   // PropTypes.instanceOf(ProfilePg),
  //   // PropTypes.instanceOf(Forum),
  //   // PropTypes.instanceOf(CreateFlyer),
  //   <ProfilePg />,
  //   <Forum />,
  //   <CreateFlyer />
  // ])
  // component: PropTypes.element
  component: PropTypes.objectOf(function(propValue, key, componentName, location, propFullName) {
    if (!["ProfilePg", "Forum", "CreateFlyer"].includes(propValue.type.name) ) {
      return new Error(`OOPS NOT RIGHT ${propValue.type.name}`)
    }
  })
}


