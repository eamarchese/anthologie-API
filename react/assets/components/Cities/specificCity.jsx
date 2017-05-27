import React, { Component } from 'react';
import Router, { Link, RouteHandler } from 'react-router';

import {store} from '../../Redux/store'
// components

export default class specificCity extends Component {


  constructor(props) {
    super(props);
    this.city =   {"translations": [{"id_city_translation": 0,"id_city": 0,"id_user": 0,"id_group": 0,"id_language": 1,"name": "loading",}],"cityities": [],"images": [],  "entities": [],"id_user": {"id_user": 0,"displayName": "Admin","institution": "Anthologie","country": "Canada","createdAt": "2017-05-24T14:18:59.000Z","updatedAt": "2017-05-25T06:30:46.000Z"},"id_city": 0,"GPS":null,"createdAt": "2017-05-25T07:38:26.000Z","updatedAt": "2017-05-25T07:38:26.000Z"};
    this.fetchAPI();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  fetchAPI(){
      let that = this;
      fetch('/api/v1/cities/'+that.props.params.id,{
        method:'GET',
        credentials: 'same-origin'
      })
      .then(function(response){
        return response.json();
      })
      .then(function(json){
        that.city = json;
        that.refs.gps.value = json.GPS;
        that.forceUpdate();
        return null;
      });
  }

  handleSubmit = function (e) {
    e.preventDefault();
    let that = this;
    //get name and family
    let corps = {GPS:this.refs.gps.value}
    fetch("/api/v1/cities/"+that.props.params.id,
    {
        method: "POST",
        body: JSON.stringify(corps),
        credentials: 'same-origin'
    })
    .then(function(res){
      if(!res.ok){throw res.json();}
      return res.json()})
    .then(function(data){
      that.city = data;
      //console.log(that.refs.gps);
      that.refs.gps.value = data.GPS;
      that.forceUpdate();
      return null})
    .catch(function(error){return error})
    .then(function(error){if(error != null){alert(error.message)};}.bind(this));
  }



  render() {
    let update = <p className="legend">You can't update this record.</p>
    let readOnly = true;
    if((this.city.id_user && store.getState().user && this.city.id_user.id_user == store.getState().user.id_user) || (store.getState().user && store.getState().user.admin)){
      update = <input type="submit" value="Update"/>;
      readOnly = false;
    }
    return (
      <main>
        <h1>{this.city.translations.map(a => a.name).join(" / ")}</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="inputContainerLanguage"><label>ID city : </label><input type="text" value={this.city.id_city} disabled="true"/></div>
            <div className="inputContainerLanguage"><label>GPS : </label><input placeholder="ex : 45.4991117,-73.6181167" type="text" ref="gps" defaultValue={this.city.GPS} disabled={readOnly} /></div>
            <div className="inputContainerLanguage"><label>created at : </label><input type="text" value={this.city.createdAt} disabled="true"/></div>
            <div className="inputContainerLanguage"><label>updated at : </label><input type="text" value={this.city.updatedAt} disabled="true"/></div>
            {this.city.id_user && <div className="inputContainerLanguage"><label>Owner : </label><input type="text" value={'['+this.city.id_user.institution+'] ' + this.city.id_user.displayName} disabled="true"/></div>}
            {update}
          </form>
        </main>
    );
  }
}