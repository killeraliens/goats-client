import React from 'react';
import ReactDOM from 'react-dom';
const createReactClass = require('create-react-class');
// https://stackoverflow.com/questions/22677931/react-js-onchange-event-for-contenteditable

const ContentEditable = createReactClass({
  render: function () {
    return <div
      // id="contenteditable"
      id={this.props.id}
      name={this.props.name}
      aria-label={this.props.ariaLabel}
      aria-required={this.props.ariaRequired}
      aria-describedby={this.props.ariaDescribedBy}
      aria-invalid={this.props.ariaInvalid}
      onInput={this.emitChange}
      onBlur={this.emitChange}
      className={this.props.className}
      contentEditable
      dangerouslySetInnerHTML={{ __html: this.props.html }}></div>;
  },

  shouldComponentUpdate: function (nextProps) {
    return nextProps.html !== ReactDOM.findDOMNode(this).innerHTML;
  },

  componentDidUpdate: function () {
    if (this.props.html !== ReactDOM.findDOMNode(this).innerHTML) {
      console.log(`component did update, html val !== this inner html`)
      this.getDOMNode().innerHTML = this.props.html;
    }
  },

  emitChange: function () {
    var html = ReactDOM.findDOMNode(this).innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange({
        target: {
          value: html
        }
      });
    }
    this.lastHtml = html;
  }
});

export default ContentEditable;
