import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Link } from 'react-router-dom';
import MainHeader from '../MainHeader/MainHeader';
import MainNav from '../MainNav/MainNav';
import MainNavLink from '../MainNavLink/MainNavLink';
import Feed from '../Feed/Feed.js';
import Country from '../Country/Country.js';
import AppContext from '../../AppContext';
import NotFound from '../NotFound/NotFound';

export default function Forum({ flyers, events, users, fetching }) {
  //const users = useContext(AppContext).users
  const countriesHash = {}
  const regionHash = {}

  events.forEach(event => {
    if (Boolean(event.country_name)) {
      if (!Object.keys(countriesHash).includes(event.country_name)) {
        countriesHash[event.country_name] = 0
      }
      countriesHash[event.country_name]++
    } else {
      return
    }
  })

  events.forEach(event => {
    if (Boolean(event.region_name)) {
      if (!Object.keys(regionHash).includes(event.region_name)) {
        regionHash[event.region_name] = { count: 0 }
        if (Boolean(event.country_name)) {
          regionHash[event.region_name].country_name = event.country_name
        }
      }
      regionHash[event.region_name].count ++
    } else {
      return
    }
  })

  const getRegionsForCountry = (country) => {
    let arr = Object.keys(regionHash).filter(region => {
      return regionHash[region].country_name === country
    })
    return arr
  }

  const filterLinks = Object.keys(countriesHash).sort().map(country => {
    let regions = getRegionsForCountry(country)
    return (
      <React.Fragment>
        <MainNavLink to={`/forum/${country}`}>
          {country}
          <span className="MainNavLink--count">{countriesHash[country]}</span>
        </MainNavLink>
        {regions.sort().map(region => {
          return (
            <MainNavLink key={region} to={`/forum/${region}`}>
              {region}
              <span className="MainNavLink--count">{regionHash[region].count}</span>
            </MainNavLink>
          )
        })}
      </React.Fragment>
    )
  })

  const countryRoutes = Object.keys(countriesHash).map(country => {
    const flyerEvents = events.filter(event => event.country_name === country)
    let countryFlyers = []
    for ( let i=0; i < flyerEvents.length; i++ ) {
      flyers.forEach(flyer => {
        if (flyer.id === flyerEvents[i].flyer_id) {
          if (!countryFlyers.find(cflyer => cflyer.id == flyer.id)) {
            countryFlyers.push(flyer)
          }
        }
      })
    }

    return <Route key={country} path={`/forum/${country}`} render={() => {
      return <Country countryName={country} countryFlyers={countryFlyers} events={events} users={users} fetching={fetching}/>
    }}/>
  })

  const regionRoutes = Object.keys(regionHash).map(region => {
    const flyerEvents = events.filter(event => event.region_name === region)
    let regionFlyers = []
    for (let i = 0; i < flyerEvents.length; i++) {
      flyers.forEach(flyer => {
        if (flyer.id === flyerEvents[i].flyer_id) {
          if (!regionFlyers.find(cflyer => cflyer.id == flyer.id)) {
            regionFlyers.push(flyer)
          }
        }
      })
    }

    return <Route key={region} path={`/forum/${region}`} render={() => {
      return <Country countryName={regionHash[region].country_name} regionName={region} countryFlyers={regionFlyers} events={events} users={users} fetching={fetching} />
    }} />
  })

  return(
    <div className="Forum" id="Forum">
      <MainHeader >
        Goat's Forum
      </MainHeader>
      <MainNav
        links={filterLinks}
      />
      <div className="Main--content">
        <Switch>
          <Route exact path={`/forum`} render={() => {
            return <Feed flyers={flyers} events={events} users={users} fetching={fetching} />
          }} />
          { countryRoutes }
          { regionRoutes}
          < Route render={() => {
            return <NotFound link={<Link to="/forum">Back to forum</Link>} />
          }} />
        </Switch>
      </div>
    </div>


  )
}

Forum.propTypes = {
  flyers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired,
    creator_id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired
  })),
  events: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired,
    flyer_id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired
  })),
  // users: PropTypes.arrayOf(PropTypes.shape({
  //   id: PropTypes.oneOfType([
  //     PropTypes.number,
  //     PropTypes.string
  //   ]).isRequired
  // })),
  fetching: PropTypes.bool
}
