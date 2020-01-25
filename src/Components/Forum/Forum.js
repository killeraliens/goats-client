import React, { useState, useEffect } from 'react';
// import { Route, Switch } from 'react-router-dom';
import MainHeader from '../MainHeader/MainHeader';
import MainNav from '../MainNav/MainNav';
import MainNavLink from '../MainNavLink/MainNavLink';
import Feed from '../Feed/Feed.js';
import Spinner from '../Spinner/Spinner';
import DUMMY from '../../DUMMY';


export default function Forum({ flyers, events, users }) {
  const [filterLinks, setFilterLinks] = useState([])
  const [fetching, setFetching] = useState(false)

  if (fetching) {
    return <Spinner />
  }
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
        <Feed flyers={flyers} events={events} users={users}/>
      </div>

    </div>
  )
}
