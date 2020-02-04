import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Main.css';
import { animateScroll } from "react-scroll";

function scrollToTop() {
  animateScroll.scrollToTop({
    containerId: "Main"
  });
}

export default function Main({ component }) {
  useEffect(() => {
     return scrollToTop()
  }, [component])

  return(
    <div className="Main" id="Main">
      { component }
    </div>
  )
}

Main.propTypes = {
  component: PropTypes.element
}


