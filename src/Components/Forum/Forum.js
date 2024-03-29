import React, { useContext } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import MainHeader from '../MainHeader/MainHeader';
import Feed from '../Feed/Feed.js';
import NotFound from '../NotFound/NotFound';
import AuthedContext from '../../AuthedContext';
import CountryRegions from '../CountryRegions/CountryRegions'


export default function Forum() {
  const { flyers, fetching, fetchingAdditional, total, handleClickLoad } = useContext(AuthedContext)

  return(
    <div className="Forum" id="Forum">
      <MainHeader >
        <Link to='/flyers' className='header-link'>
          UNHOLYGRAIL
        </Link>
      </MainHeader>
      <CountryRegions format={"links"}/>
      <div className="Main--content">
        <Switch>
          <Route exact path={`/flyers`} render={() => {
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
          <Route render={() => {
            return <NotFound link={<Link to="/flyers">Back to flyer feed</Link>} />
          }} />
        </Switch>
      </div>
    </div>
  )
}

