import React, { useContext } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import MainHeader from '../MainHeader/MainHeader';
import MainNav from '../MainNav/MainNav';
import Feed from '../Feed/Feed.js';
import NotFound from '../NotFound/NotFound';
import AuthedContext from '../../AuthedContext';
import CountryRegions from '../CountryRegions/CountryRegions'

export default function Forum() {
  const { flyers, fetching, fetchingAdditional, total, handleClickLoad, serverError } = useContext(AuthedContext)

  if (Boolean(serverError)) {
    console.log('SERVER errr in Forum')
    return (<NotFound
      message={`${serverError}, log back in.`}
      link={<Link to='/public/signin'>Sign in</Link>}
    />)
  }
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

