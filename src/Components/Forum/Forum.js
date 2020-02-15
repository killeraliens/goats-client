import React, { useContext } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import MainHeader from '../MainHeader/MainHeader';
import MainNav from '../MainNav/MainNav';
import MainNavLink from '../MainNavLink/MainNavLink';
import Feed from '../Feed/Feed.js';
import Country from '../Country/Country.js';
import NotFound from '../NotFound/NotFound';
import AuthedContext from '../../AuthedContext';
import CountryRegions from '../CountryRegions/CountryRegions'
import Spinner from '../Spinner/Spinner'

export default function Forum() {
  const { flyers, events, users, fetching, fetchingAdditional, total, handleClickLoad } = useContext(AuthedContext)

  return(
    <div className="Forum" id="Forum">
      <MainHeader >
        Goat's Forum
      </MainHeader>
      <MainNav>
       <CountryRegions format={"links"} />
      </MainNav>

      <div className="Main--content">
        <Switch>
          <Route exact path={`/forum`} render={() => {
            return (
              <Feed
                flyers={flyers}
                events={events}
                users={users}
                fetching={fetching}
                fetchingAdditional={fetchingAdditional}
                total={total}
                handleClickLoad={handleClickLoad}
                />
            )
          }} />
          <CountryRegions format={"routes"} />
          < Route render={() => {
            return <NotFound link={<Link to="/forum">Back to forum</Link>} />
          }} />
        </Switch>
      </div>
    </div>
  )
}

