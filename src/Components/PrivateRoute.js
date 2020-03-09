import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AppContext from '../AppContext'


class PrivateRoute extends Component {
  static contextType = AppContext;

  render() {

    const { Path, component: Component, render: RenderComp, history, ...restProps } = this.props;
    //how do I send this message to the root apps state on Redirect?
    //const message ='You must be logged in';
    const unauthError = this.context.error && this.context.error.status === 401
      ? true
      : false

    return this.context.user && Component && !unauthError
      ? <Route path={Path} component={Component} {...restProps}/>
      : this.context.user && RenderComp && !unauthError
      ? <Route path={Path} render={RenderComp} {...restProps}/>
      : <Redirect to='/public/signin'/>

  }
}

export default PrivateRoute;

