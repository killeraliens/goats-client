import React, { useState, useEffect, useContext } from 'react';
import { Route } from 'react-router-dom';
import AppContext from '../../AppContext'
import AuthedContext from '../../AuthedContext'
import PropTypes from 'prop-types';
import config from '../../config';
import Spinner from '../Spinner/Spinner';
import MainNav from '../MainNav/MainNav';
import MainNavLink from '../MainNavLink/MainNavLink';
import Country from '../Country/Country';

export default function CountryRegions({ format }) {
  const [data, setData] = useState([])
  const [fetching, setFetching] = useState(true)
  const [serverError, setServerError] = useState('')
  const { user } = useContext(AppContext)

  useEffect(() => {
    const fetchData = async () => {
      setFetching(true)
      setServerError('')
      const options = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        }
      }
      const response = await fetch(`${config.API_ENDPOINT}/country-region-hash`, options)
      const body = await response.json()
      if( !response.ok ) {
        setServerError(body.message)
        setFetching(false)
      } else {
        setData(body)
        setServerError('')
        setFetching(false)
      }
    }

    fetchData();
  }, []);

  let countryRegionRoutes = []
  if (format === "routes") {
    for (let i = 0; i < data.length; i++) {
      countryRegionRoutes.push(
        <React.Fragment key={i}>
          <Route key={data[i].country_name} path={`/forum/${data[i].country_name}`} render={() => {
            return <Country countryName={data[i].country_name} />
          }} />
          {data[i].regions.map(region => {
            if (Boolean(region.region_name)) {
              return <Route key={region.region_name} path={`/forum/${region.region_name}`} render={() => {
                return <Country countryName={data[i].country_name} regionName={region.region_name} />
              }} />
            }
          })}
        </React.Fragment>
      )
    }
  }

  if( fetching ) {
    return <Spinner />
  }

  if (Boolean(serverError)) {
    return null
  }

  if (format === "links") {
    return (
        data.map((country, i) => {
          return (
            <React.Fragment key={i}>
              <MainNavLink to={`/forum/${country.country_name}`}>
                {country.country_name}
                <span className="MainNavLink--count">{country.per_country}</span>
              </MainNavLink>
              {country.regions.map(region => {
                return (
                  <MainNavLink key={region.region_name} to={`/forum/${region.region_name}`}>
                    {region.region_name}
                    <span className="MainNavLink--count">{region.per_region}</span>
                  </MainNavLink>
                )
              })}
            </React.Fragment>
          )
        })
    )
  }
  return (
    countryRegionRoutes.map(route => route)
  )
}

CountryRegions.defaultProps = {
  format: "links"
}

CountryRegions.propTypes = {
  format: PropTypes.oneOf(["links", "routes"])
}
