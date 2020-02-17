import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

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
    const details = this.state.error && this.state.error.message
      ? <details>{this.state.error.message}</details>
      : null

    const message = this.state.error && this.state.error.message && typeof this.state.error.message === 'string'
      ? <details>{this.state.error}</details>
      : null

    if (this.state.hasError) {
      return (
        <div className='ErrorBoundary'>
          <summary>Something went wrong.</summary>
          {message}
        </div>
      )
    }

    return this.props.children
  }
}

export default withRouter(ErrorBoundary);
