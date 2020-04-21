import React, { Component } from 'react'
import MetaTags from 'react-meta-tags'
import metaImage from './assets/goats-arm-meta.png'

class UseMeta extends Component {
  render() {
    return (
     <MetaTags>
        <title>GOATS GUIDE</title>
        <meta
          name="description"
          content="Know of an upcoming concert, fest, or tour? Share the flyer here. Digitally archive posters and event artwork."
        />
        <meta
          name="keywords"
          content="goats guide, goatsguide, fliers, flyers, poster archive, metal, concerts, festivals, metal shows, metal events, flyer archive"
        />
        <meta property="og:title" content="GOATS GUIDE" />
        <meta property="og:description" content="Know of an upcoming concert, fest, or tour? Share the flier here. Digitally archive posters and event artwork." />
        <meta property="og:url" content="goatsguide.com" />
        <meta property="og:image" content="https://res.cloudinary.com/killeraliens/image/upload/v1587509079/goats-arm-meta.png" />
      </MetaTags>
    )
  }
}
export default UseMeta

