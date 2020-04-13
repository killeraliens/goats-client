import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AppContext from '../AppContext'


class PrivateRoute extends Component {
  static contextType = AppContext;

  render() {
    const { Path, component: Component, render: RenderComp, history, ...restProps } = this.props;

    return this.context.user && Component
      ? <Route path={Path} component={Component} {...restProps}/>
      : this.context.user && RenderComp
      ? <Route path={Path} render={RenderComp} {...restProps}/>
      : <Redirect to={{ pathname: '/public/signin', state: { status: 'Unauthorized'} }} />

  }
}

export default PrivateRoute;

