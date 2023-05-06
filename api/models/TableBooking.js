/**
 * TableBooking.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    email:{
      type: 'string',
      required: true,
      isEmail: true
    },
    clientName:{
      type: 'string',
      required: true
    },
    number:{
      type: 'number',
      required: true
    },
    date:{
      type: 'string',
    },
    time:{
      type: 'string',
    },
    persons:{
      type: 'number',
    },
    message:{
      type: 'string',
    }
  },

};

