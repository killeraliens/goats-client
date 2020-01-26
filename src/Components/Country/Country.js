import React from 'react';
import Feed from '../Feed/Feed';

export default function Country({ countryName, countryFlyers, events, users, fetching}) {
  return(
    <div className="Main--content">
      <h1>{countryName}</h1>
      <Feed flyers={countryFlyers} events={events} users={users} fetching={fetching} />
    </div>
  )
}
