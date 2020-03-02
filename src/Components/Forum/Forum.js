import React, { useContext } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import MainHeader from '../MainHeader/MainHeader';
import Feed from '../Feed/Feed.js';
import NotFound from '../NotFound/NotFound';
import AuthedContext from '../../AuthedContext';
import AppContext from '../../AppContext'
import CountryRegions from '../CountryRegions/CountryRegions'
import BackLink from '../BackLink/BackLink';

export default function Forum() {
  const { flyers, fetching, fetchingAdditional, total, handleClickLoad, serverError } = useContext(AuthedContext)
  const { error } = useContext(AppContext)

  switch (true) {
    // case !!serverError && serverError.status === 401:
    case !!error && error.status === 401:
    return (
      <NotFound
        message="Session expired"
        isFetching={fetching}
        link={<Link to='/public/signin' >Sign In</Link>} />
    )


    default:
      return(
        <div className="Forum" id="Forum">
          <MainHeader >
            <Link to='/forum' className='header-link'>
              Goat's Forum
            </Link>
          </MainHeader>
          <CountryRegions format={"links"} />


          <div className="Main--content">
            <Switch>
              <Route exact path={`/forum`} render={() => {
                return (
                  <Feed
                    flyers={flyers}
                    fetching={fetching}
                    fetchingAdditional={fetchingAdditional}
                    total={total}
                    handleClickLoad={handleClickLoad}
                    />
                )
              }} />
              <CountryRegions format={"routes"}/>
              < Route render={() => {
                return <NotFound link={<Link to="/forum">Back to forum</Link>} />
              }} />
            </Switch>
            <BackLink />
          </div>
        </div>
      )

  }

}

