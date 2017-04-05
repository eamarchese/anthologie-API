/**
 * Oauth2_auth_codes.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  tableName: 'oauth2_auth_codes',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    id: {
      type: 'integer',
      required: true,
      autoIncrement: true,
      primaryKey: true,
      size: 11
    },
    client_id: {
      type: 'integer',
      required: true,
      index: true,
      size: 11
    },
    user_id: {
      type: 'integer',
      required: false,
      index: true,
      size: 11
    },
    token: {
      type: 'string',
      required: true,
      unique: true,
      size: 255
    },
    redirect_uri: {
      type: 'longtext',
      required: true
    },
    expires_at: {
      type: 'integer',
      required: false,
      size: 11
    },
    scope: {
      type: 'string',
      required: false,
      size: 255
    }
  }
};