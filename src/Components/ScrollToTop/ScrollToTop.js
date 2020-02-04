import { useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router-dom";

export default function ScrollToTop({ children }) {
  const { pathname } = useLocation();
  const [position, setPosition] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(pathname)
    console.log({...children})
  }, [pathname]);

//   useEffect(() => {
//     const unlisten = history.listen(() => {
//       console.log("listening on", pathname)
//       console.log("component", componentName)
//       window.scrollTo(0, 0);
//     });
//     return () => {
//       unlisten();
//     }
//   }, [pathname]);

  return children ? children : null;
}



//export default withRouter(ScrollToTop);
