import React, { Component } from 'react';
import Router, { Link, RouteHandler } from 'react-router';

// components

export default class mainAuthors extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <main className="whiteBox">list of all authors</main>
    );
  }
}