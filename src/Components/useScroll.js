import { useState, useEffect } from 'react';

export function useScroll(containerId, itemClassName) {
  const container = document.getElementById(containerId)
  //const watchItem = document.getElementById(itemId)
  const watchItem = document.getElementsByClassName(itemClassName)[0]

  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [bodyOffset, setBodyOffset] = useState(
    document.body.getBoundingClientRect()
  );
  const [scrollY, setScrollY] = useState(bodyOffset.top);
  const [scrollX, setScrollX] = useState(bodyOffset.left);
  const [scrollDirection, setScrollDirection] = useState();

  const listener = e => {
    if (watchItem) {
      setBodyOffset(watchItem.getBoundingClientRect());
    }
    // setBodyOffset(document.body.getBoundingClientRect());
    setScrollY(-bodyOffset.top);
    setScrollX(bodyOffset.left);
    setScrollDirection(lastScrollTop > -bodyOffset.top ? "down" : "up");
    setLastScrollTop(-bodyOffset.top);
  };

  useEffect(() => {
    if (container) {
      container.addEventListener("scroll", listener);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", listener);
      }
    };
  });

  return {
    scrollY,
    scrollX,
    scrollDirection
  };
}
