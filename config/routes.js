/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  'GET /api/contactform': 'ContactformController.find',
  'POST /api/contactform': 'ContactformController.create',
  'GET /api/contactform/:id': 'ContactformController.read',
  'PUT /api/contactform/:id': 'ContactformController.update',
  'DELETE /api/contactform/:id': 'ContactformController.delete',

  'GET /api/tablebookings': 'TableBookingController.find',
  'POST /api/tablebookings': 'TableBookingController.create',
  'GET /api/tablebookings/:id': 'TableBookingController.findOne',
  'PUT /api/tablebookings/:id': 'TableBookingController.update',
  'DELETE /api/tablebookings/:id': 'TableBookingController.destroy',
};
