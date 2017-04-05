/**
 * Entities_authors_assoc.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  tableName: 'entities_authors_assoc',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    entities_id: {
      type: 'integer',
      required: true,
      primaryKey: true,
      size: 11
    },
    authors_id: {
      type: 'integer',
      required: true,
      primaryKey: true,
      size: 11
    }
  }
};