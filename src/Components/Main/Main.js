import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Main.css';
import { animateScroll } from "react-scroll";

function scrollToTop() {
  animateScroll.scrollToTop({
    containerId: "Main"
  });
}

export default function Main({ component, children }) {
  // useEffect(() => {
  //    return scrollToTop()
  // }, [{ ...component.type.displayName }])

  return(
    <div className="Main" id="Main">
      { component }
      { children }
    </div>
  )
}

Main.propTypes = {
  component: PropTypes.element,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}


