import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import NotFound from './NotFound/NotFound'

class ErrorBoundary extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hasError: false
    }

  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error }
  }

  static defaultProps = {
    history: { listen: () => { } }
  }


  componentDidMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      if (this.state.hasError) {
        this.setState({ hasError: false, error: null });
      }
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='ErrorBoundary'>
          <NotFound message='Something went wrong.' link={<Link to='/public/signin'/>}/>
        </div>
      )
    }

    return this.props.children
  }
}

export default withRouter(ErrorBoundary);
