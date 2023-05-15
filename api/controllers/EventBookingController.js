/**
 * EventBookingController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // GET /reservation
  find: async (req, res) => {
    try {
      const reservations = await EventBooking.find();
      return res.ok(reservations);
    } catch (err) {
      return res.serverError(err);
    }
  },

  // GET /reservation/:id
  findOne: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.badRequest('Invalid ID');
      }
      const reservation = await EventBooking.findOne({ id: req.params.id });
      if (!reservation) {
        return res.notFound('Event booking not found');
      }
      return res.ok(reservation);
    } catch (err) {
      return res.serverError(err);
    }
  },

  // POST /reservation
  create: async (req, res) => {
    try {
      if (!req.body) {
        return res.badRequest('Invalid request body empty');
      }
      if (!req.body.clientName || !req.body.email || !req.body.number) {
        return res.badRequest(
            'clientName, email, number All fields are required'
        );
      }
      const newReservation = await EventBooking.create(req.body).fetch();
      return res.ok(newReservation);
    } catch (err) {
      return res.serverError(err);
    }
  },

  // PUT /reservation/:id
  update: async (req, res) => {
    try {
      if (!req.params.id) {
        return res.badRequest('Invalid ID');
      }
      const updatedReservation = await EventBooking.updateOne({
        id: req.params.id,
      }).set(req.body);
      if (!updatedReservation) {
        return res.notFound('Event booking not found');
      }
      return res.ok(updatedReservation);
    } catch (err) {
      return res.serverError(err);
    }
  },

  // DELETE /reservation/:id
  destroy: async (req, res) => {
    try {
      if (!req.params.id) {
        return res.badRequest('Invalid ID');
      }
      const deletedReservation = await EventBooking.destroyOne({
        id: req.params.id,
      });
      if (!deletedReservation) {
        return res.notFound('Event booking not found');
      }
      return res.ok('Evenet booking deleted successfully');
    } catch (err) {
      return res.serverError(err);
    }
  },
};
