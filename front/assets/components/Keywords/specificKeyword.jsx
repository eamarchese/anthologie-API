import React, { Component } from 'react';
import Router, { Link, RouteHandler } from 'react-router';
import { browserHistory } from 'react-router';

import {store} from '../../Redux/store'
import _ from 'lodash'
import {displayLang} from 'helpers/displayLang.jsx'

// components

export default class specificKeyword extends Component {


  constructor(props) {
    super(props);
    let placeholder = {"versions": [{"id_keyword_version": 0,"id_keyword": 0,"id_user": 0,"id_group": 0,"id_language": 1,"title": "loading",}],"keywordities": [],"images": [],  "entities": [],"id_user": {"id_user": 0,"displayName": "Admin","institution": "Anthologie","country": "Canada","createdAt": "2017-05-24T14:18:59.000Z","updatedAt": "2017-05-25T06:30:46.000Z"},"id_keyword": 0,"born": null,"born_range": null,"died": null,"died_range": null,"activity_start": null,"activity_end": null,"activity_range": null,"createdAt": "2017-05-25T07:38:26.000Z","updatedAt": "2017-05-25T07:38:26.000Z","city_born":{"id_city":1},"city_died":{"id_city":1}};
    this.keyword = _.get(store.getState(),'keywordsLookup['+this.props.params.id+']',placeholder);
    this.fetchAPI();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteKeyword = this.deleteKeyword.bind(this);
  }

  fetchAPI(){
      let that = this;
      fetch('/api/v1/keywords/'+that.props.params.id,{
        method:'GET',
        credentials: 'same-origin'
      })
      .then(function(response){
        return response.json();
      })
      .then(function(json){
        that.keyword = json;
        //that.refs.city_born = json.city_born;
        that.forceUpdate();
        return null;
      });
  }


  deleteName = function(version){
    //console.log('clicked',this,version);
    let that = this;
    fetch('/api/v1/keywords/'+version.id_keyword+'/versions/'+version.id,    {
            method: "DELETE",
            credentials: 'same-origin'
        })
        .then(function(data){
          browserHistory.push('/keywords');
          browserHistory.push('/keywords/'+that.props.params.id);
        });
  }

  deleteKeyword = function(e){
    e.preventDefault();
    let that = this;
    if(this.refs.confirmDelete.value == "DELETE"){
      fetch('/api/v1/keywords/'+that.props.params.id,{
        method:'DELETE',
        credentials: 'same-origin'
      })
      .then(function(response){
        return response.json();
      })
      .then(function(json){
        browserHistory.push('/keywordCategories');
        //that.refs.city_born = json.city_born;
        return null;
      });
    }
    else{
      alert('Type "DELETE" if you want to delete this keyword');
    }
  }

  moveToEntity = function(entity){
    browserHistory.push('/entities/'+entity);
  }

  handleSubmit = function(e){
    e.preventDefault();
    let radios = document.getElementsByName("category");
    let category = null;
    for(let i=0;i<radios.length;i++){
      if(radios[i].checked){category = radios[i].value}
    }

    let corps = {category};
    let that = this;
    fetch('/api/v1/keywords/'+that.props.params.id,{
      method:'POST',
      body: JSON.stringify(corps),
      credentials: 'same-origin'
    })
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      browserHistory.push('/keywordCategories');
      return null;
    });
  }


  render() {
    let update = <p className="legend">You can't update this record.</p>
    let readOnly = true;
    if((this.keyword.id_user && store.getState().user && this.keyword.id_user.id_user == store.getState().user.id_user) || (store.getState().user && store.getState().user.admin)){
      update = <input type="submit" value="Update"/>;
      readOnly = false;
    }
    return (
      <main>
        <h1>{this.keyword.versions.map(a => a.title).join(" / ")}</h1>
        <h6>anthologia.ecrituresnumeriques.ca/api/v1/keywords/{this.keyword.id_keyword}</h6>
          <form onSubmit={this.handleSubmit}>
            <div className="inputContainerLanguage"><label>ID keyword : </label><input type="text" value={this.keyword.id_keyword} disabled="true"/></div>
            {this.keyword.versions.map((version,i)=>(<div className="inputContainerLanguage" key={'keywordName'+version.id}><label>{i?'':'Titles : '}</label><input type="text" value={'['+  displayLang(store.getState().languagesLookup[version.id_language])+'] '+version.title} disabled="true"/>{!readOnly && <button type="button" onClick={()=>this.deleteName(version)} >X</button>}</div>))}
            {!readOnly && <div className="inputContainerLanguage"><Link className="addToCollection" to={'/keywords/newVersion/'+this.props.params.id}>Add a title </Link></div>}

            {this.keyword.entities.map((entity,i)=>(<div className="inputContainerLanguage" key={'entity'+entity.id_entity}><label>{i?'':'Keyword of : '}</label><p  onClick={()=>this.moveToEntity(entity.id_entity)}>{entity.title}</p></div>))}

            <div className="inputContainerLanguage"><label>Keyword Category :</label><div>
              <label><input id="unassign" type="radio" value={0} name="category" defaultChecked={!this.keyword.category}/>not assigned</label>
              {store.getState().keywordCategory.map((category,i)=>(<label key={"selectCategory"+category.id_keyword_category}><input type="radio" name="category" value={category.id_keyword_category} defaultChecked={!!(this.keyword.category && (this.keyword.category.id_keyword_category==category.id_keyword_category))}/>{store.getState().keywordCategoryLookup[category.id_keyword_category].title}</label>))}
              </div>
            </div>

            <div className="inputContainerLanguage"><label>created at : </label><input type="text" value={this.keyword.createdAt} disabled="true"/></div>
            <div className="inputContainerLanguage"><label>updated at : </label><input type="text" value={this.keyword.updatedAt} disabled="true"/></div>
            {this.keyword.id_user && <div className="inputContainerLanguage"><label>Owner : </label><input type="text" value={'['+this.keyword.id_user.institution+'] ' + this.keyword.id_user.displayName} disabled="true"/></div>}
            {update}
            {store.getState().user && store.getState().user.admin &&
              <div className="alertBlock">
                <p>Deleting this keyword is an operation that cannot be recovered, are you sure you want to delete it?</p>
                <input placeholder="Write 'DELETE' here" ref="confirmDelete"/>
              <button onClick={this.deleteKeyword}>Delete</button>
            </div>}
          </form>
        </main>
    );
  }
}
