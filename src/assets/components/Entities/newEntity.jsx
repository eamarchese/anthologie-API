import React, { Component } from 'react';
import Router, { Link, RouteHandler } from 'react-router';
import { browserHistory } from 'react-router';

import {store} from '../../Redux/store'
// components

export default class newEntity extends Component {


  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = function (e) {
    e.preventDefault();
    //get email and password
    let corps = {title:this.refs.title.value}
    fetch("/api/v1/entities/",
      {
          method: "POST",
          body: JSON.stringify(corps),
          credentials: 'same-origin'
      })
      .then(function(res){
        if(!res.ok){throw res.json();}
        return res.json()
      })
      .then(function(data){
        browserHistory.push('/entities/'+data.id_entity);
        return null;
      })
      .catch(function(err){
        return err
      })
      .then(function(data){
        console.log(data);
        return null;
      })
  }

  componentWillMount(){
    document.title = "Add new entity | anthologie";
  }


  render() {

    return (
      <main>
        <h1>Add a new entity</h1>
        <form onSubmit={this.handleSubmit} id="entityForm">
          <input type="text" placeholder="Title" name="title" ref="title"/>
          <input type="submit" value="send"/>
        </form>
      </main>
    );
  }
}