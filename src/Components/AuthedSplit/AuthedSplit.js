import React from 'react';
import PropTypes from 'prop-types';
import Forum from '../Forum/Forum';
import Menu from '../Menu/Menu';
import './AuthedSplit.css';

export default function AuthedSplit(props) {
  return(
    <div className="AuthedSplit">
      <Menu />
      <div className="Main">
        {props.mainComponent}
      </div>
    </div>
  )
}

AuthedSplit.defaultProps = {
  mainComponent: <Forum />
}

AuthedSplit.propTypes = {
  mainComponent: PropTypes.object
}
