import React, { useContext } from 'react';
import AppContext from '../AppContext';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';


function ProfilePg(props) {
  const context = useContext(AppContext)
  const paramsId = props.match.params.user_id
  console.log("Page ID", paramsId)
  //const user = context.users.find(user => user.id == props.match.params.userId) || {};
  //console.log("PROFILE CONTEXT", context.user)

  if (context.user && context.user.id == paramsId) {
    return(<div>
      User{context.user.username} is logged in
    </div>)
  }
  return (
    <div>
      User {props.user.username}'s public profile
    </div>
  )
}

ProfilePg.defaultProps = {
  match: { params: {} },
  user: {}
}

ProfilePg.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
  user: PropTypes.shape({
    id: PropTypes.string
  })
}

export default withRouter(ProfilePg)
