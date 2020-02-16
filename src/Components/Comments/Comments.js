import React from 'react';
import PropTypes from 'prop-types';
import Comment from '../Comment/Comment';
import './Comments.css';

export default function Comments({ flyer }) {

  return(
    <div className="Comments">
       <Comment userId={flyer.creator_id} username={flyer.creator_username} imageUrl={flyer.creator_image_url} isCreator={true} comment={flyer.publish_comment} modified={flyer.modified} />
       {/* eventually map all flyer comments here */}
    </div>
  )
}

Comments.defaultProps = {
  flyer: {
    publish_comment: '',
    creator_image_url: ''
  }
}

Comments.propTypes = {
  //add commentersWithComments as prop eventually
  flyer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    publish_comment: PropTypes.string,
    creator_id: PropTypes.string.isRequired,
    creator_username: PropTypes.string.isRequired,
    creator_image_url: PropTypes.string.isRequired,
    modified: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date)
    ]).isRequired
  }).isRequired,

}

