import React from 'react';
import Feed from '../Feed/Feed';

export default function Country({ countryName, regionName, countryFlyers, events, users, fetching}) {
  return(
    <div className="Country">
      {
        countryName && regionName
        ? (
            <h1 className="Main--header--title">
              {countryName}<br/>
              { regionName }
            </h1>
          )
        : <h1 className="Main--header--title">{countryName}</h1>

      }

      <div className="Main--content">
        <Feed flyers={countryFlyers} events={events} users={users} fetching={fetching} />
      </div>

    </div>
  )
}
