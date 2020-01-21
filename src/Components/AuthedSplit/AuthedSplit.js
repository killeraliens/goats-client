import React from 'react';
import PropTypes from 'prop-types';
import Forum from '../Forum/Forum';
import Menu from '../Menu/Menu';
import Main from '../Main/Main';
import './AuthedSplit.css';

export default function AuthedSplit(props) {
  return(
    <div className="AuthedSplit">
      <Menu />
      <Main component={props.mainComponent} />
    </div>
  )
}

AuthedSplit.defaultProps = {
  mainComponent: <Forum />
}

AuthedSplit.propTypes = {
  mainComponent: PropTypes.element
}
