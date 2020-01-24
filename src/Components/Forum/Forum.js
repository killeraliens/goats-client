import React, { useState, useEffect } from 'react';
// import { Route, Switch } from 'react-router-dom';
import MainHeader from '../MainHeader/MainHeader';
import MainNav from '../MainNav/MainNav';
import MainNavLink from '../MainNavLink/MainNavLink';
import Feed from '../Feed/Feed.js';
import DUMMY from '../../DUMMY';


export default function Forum(props) {
  // MENTOR QUESTION: should i contain the setting of 'flyers' state to the Feed component, and just pass a 'params' prop to reduce?
  // I could send my back end the query or filter "all" here in react.
  // feed changes depending on where it loads (in dashboard it will pull up the users flyers), on here, it will change based on search/nav link params
  const [flyers, setFlyers ] = useState([])
  const [filterLinks, setFilterLinks] = useState([])
  const [fetching, setFetching] = useState(false)
  useEffect(() => {
    const getFlyers = () => {
      console.log('fetching flyers..')
      setFetching(true)
      setTimeout(() => {
        setFlyers(DUMMY["flyers"])
      }, 5000);
    }
    getFlyers()
  }, [])

  return(
    <div className="Forum">
      <MainHeader >
         Goat's Forum
      </MainHeader>
      <MainNav
        links={filterLinks}
      />
      <div className="Main--content">
        {/* <Switch>
          <Route exact path={`/forum`} component={Feed} />
        </Switch> */}
        <Feed flyers={flyers} />
      </div>

    </div>
  )
}
