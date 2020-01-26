import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import MainHeader from '../MainHeader/MainHeader';
import MainNav from '../MainNav/MainNav';
import MainNavLink from '../MainNavLink/MainNavLink';
import Feed from '../Feed/Feed.js';
import Country from '../Country/Country.js';


export default function Forum({ flyers, events, users, fetching }) {

  const countriesHash = {}
  events.forEach(event => {
    if(!Object.keys(countriesHash).includes(event.country_name)) {
      countriesHash[event.country_name] = 1
    }
    countriesHash[event.country_name]++
  })

  const filterLinks = Object.keys(countriesHash).sort().map(country => {
  return <MainNavLink to={`/forum/${country}`}>{country}<span>{countriesHash[country]}</span></MainNavLink>
  })
  const routes = Object.keys(countriesHash).map(country => {
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

  return(
    <div className="Forum">
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
          { routes }
        </Switch>

      </div>

    </div>
  )
}

Forum.propTypes = {

}
