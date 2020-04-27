import React, { Component } from 'react'
import PropTypes from 'prop-types';
import MetaTags from 'react-meta-tags'

class UseMeta extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { title, description, keywords, ogUrl, ogImage, ogImageAlt } = this.props
    return (
     <MetaTags>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={ogUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content={ogImageAlt} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="675" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@allthatisunholy" />
        <meta property="twitter:image" content={ogImage} />
        <meta property="twitter:image:alt" content={ogImageAlt} />
        <meta name="twitter:creator" content="@allthatisunholy" />
        <meta name="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </MetaTags>
    )
  }
}

UseMeta.defaultProps = {
  title: 'UNHOLYGRAIL',
  description: 'Upcoming shows and event flier archive.',
  keywords: 'unholy grail, unholygrail, unholygrail.org, goats guide, goatsguide, fliers, flyers, poster archive, metal, death metal, concerts, festivals, metal shows, metal events, metal flyers, flyer archive, flier archive',
  ogUrl: 'https://unholygrail.org',
  ogImage: 'https://res.cloudinary.com/killeraliens/image/upload/v1587527896/goats-guide/goats-arm-meta-1200x675.png',
  ogImageAlt: 'UNHOLYGRAIL corpse arm.'
}

UseMeta.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  ogUrl: PropTypes.string,
  ogImage: PropTypes.string,
  ogImageAlt: PropTypes.string
}

export default UseMeta

