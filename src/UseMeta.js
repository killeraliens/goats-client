import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MetaTags from 'react-meta-tags'
import metaImage from './assets/goats-arm-meta.png'
import API_ENDPOINT  from './config'

class UseMeta extends Component {
  render() {
    return (
     <MetaTags>
        <title>GOATS GUIDE PG</title>
        <meta name="description" content="Some description." />
        <meta property="og:title" content="GOATS GUIDE" />
        <meta property="og:image" content={`${API_ENDPOiNT}/goats-arm-meta.png`} />
      </MetaTags>
    )
  }
}
export default UseMeta

