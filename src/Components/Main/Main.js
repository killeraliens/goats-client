import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Main.css';
import { animateScroll } from "react-scroll";
import { useScroll } from '../useScroll'
import Footer from '../Footer/Footer'

function scrollToTop() {
  animateScroll.scrollToTop({
    containerId: "Main"
  });
}

export default function Main({ component, children}) {
  const { ...props } = component
  const matchPath = props && props.match && props.match.path
  ? props.match.path
  : null

  useEffect(() => {
    return scrollToTop()
  }, [matchPath])


  const { scrollDirection } = useScroll("Main", "MainHeader")
  const container = document.getElementById("Main")
  const countryRegionsNav = document.getElementById("CountryRegionsNav")
  const feedContent = document.getElementsByClassName("Main--content")[0]

  const handleScroll = (e) => {
    if (container && countryRegionsNav) {
      const atTop = container.scrollTop === 0
      const atRockBottom = container.scrollHeight - (container.scrollTop + container.clientHeight) === 0
      const atBottom = container.scrollHeight - (container.scrollTop + container.clientHeight) < countryRegionsNav.clientHeight
      if (atTop || atRockBottom) {
        e.preventDefault()
      }
      if (container.scrollTop <= 68 || atRockBottom) {
        countryRegionsNav.style.position = "relative";
        countryRegionsNav.style.top = "0px";
        feedContent.style.top = "0px";
      }
      if (scrollDirection === 'up' && container.scrollTop > 68 ) {
        countryRegionsNav.style.top = `${0 - countryRegionsNav.clientHeight}px`;
      }
      if (scrollDirection === 'down' && container.scrollTop > 68 && !atBottom) {
        countryRegionsNav.style.position = "fixed"
        countryRegionsNav.style.top = `0px`;
        feedContent.style.top = `${countryRegionsNav.clientHeight}px`
      }
    }
  }

  return(
    <div className="Main scrollable" id="Main" onScroll={handleScroll} onTouchMove={handleScroll}>
      { component }
      { children }
      <Footer />
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


