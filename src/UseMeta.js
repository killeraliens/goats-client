import React, { Component } from 'react'
import MetaTags from 'react-meta-tags'
import metaImage from './assets/goats-arm-meta.png'

class UseMeta extends Component {
  render() {
    return (
     <MetaTags>
        <title>GOATSGUIDE</title>
        <meta name="description" content="All that is UNHOLY. Upcoming shows and event flyer archive." />
        <meta name="keywords" content="goats guide, goatsguide, fliers, flyers, poster archive, metal, concerts, festivals, metal shows, metal events, metal flyers, flyer archive, unholygrail" />

        <meta property="og:title" content="GOATSGUIDE" />
        <meta property="og:description" content="All that is UNHOLY. Upcoming shows and event flyer archive." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://goatsguide.com" />
        <meta property="og:image"
          content="https://res.cloudinary.com/killeraliens/image/upload/v1587527896/goats-guide/goats-arm-meta-1200x675.png" />
        <meta property="og:image:alt" content="GOATSGUIDE corpse arm." />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="675" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@allthatisunholy" />
        <meta property="twitter:image"
          content="https://res.cloudinary.com/killeraliens/image/upload/v1587527896/goats-guide/goats-arm-meta-1200x675.png" />
        <meta property="twitter:image:alt" content="GOATSGUIDE corpse arm." />
        <meta name="twitter:creator" content="@allthatisunholy" />
        <meta name="twitter:title" content="GOATSGUIDE" />
        <meta property="twitter:description" content="All that is UNHOLY. Upcoming shows and event flyer archive." />
      </MetaTags>
    )
  }
}
export default UseMeta

