import React, { Component } from 'react';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="whiteBox">
          <div className="wrapper"><strong>Anthologie palatine</strong></div>
      </header>
    );
  }
}