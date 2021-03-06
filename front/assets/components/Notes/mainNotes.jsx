import React, { Component } from 'react';
import Router, { Link, RouteHandler } from 'react-router';
import {store} from '../../Redux/store'
import _ from 'lodash'

// components

export default class mainNotes extends Component {


  constructor(props) {
    super(props);
    let placeholder = [{title:"loading",versions:[{name:'loading'}]}];
    this.notes = _.get(store.getState(),'notes',placeholder);
    this.fetchNotes();
  }

   fetchNotes(){
       let sortByTitle = function(a, b) {
         var nameA = a.title.toUpperCase(); // ignore upper and lowercase
         var nameB = b.title.toUpperCase(); // ignore upper and lowercase
         if (nameA < nameB) {return -1;}
         if (nameA > nameB) {return 1;}
         return 0;
       }
     let that = this;
     fetch('/api/v1/notes')
     .then(function(response){
       return response.json();
     })
     .then(function(json){
       //console.log(json)
       that.notes = json.sort(sortByTitle);
       that.forceUpdate();
     });
   }


  render() {

    return (
      <main>
        <div>
        <h1>list of all notes</h1>
        <h6>anthologia.ecrituresnumeriques.ca/api/v1/notes</h6>
        {store.getState().loggedIn && <Link to="/notes/new" className="addto" activeStyle={{ color: 'black' }}>add new note</Link>}
        {this.notes.map((note,i)=>(<Link to={"/notes/"+note.id_note} key={"note"+note.id_note} id={note.id_note}>{note.title}</Link>))}
        </div>
        </main>
    );
  }
}
