/**
 * Scholies_s.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  tableName: 'scholies_versions',
  autoPK: false,
  attributes: {
    id_scholie_version: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true,
      size: 11
    },
    id_scholie: {
      model:'Scholies'
    },
    id_user: {
      model:'Users'
    },
    id_group: {
      model:'User_Groups'
    },
    id_language: {
      model:'Languages'
    },
    text: {
      type: 'text',
      required: false
    },
    edition: {
      type: 'text',
      required: false
    }
  }
};
