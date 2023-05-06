/**
 * TableBookingController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const nodemailer = require('nodemailer');

module.exports = {
  // GET /reservation
  find: async (req, res) => {
    try {
      const reservations = await TableBooking.find();
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
      const reservation = await TableBooking.findOne({ id: req.params.id });
      if (!reservation) {
        return res.notFound('Table booking not found');
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
      const newReservation = await TableBooking.create(req.body).fetch();
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USERNAME,
          pass: process.env.GMAIL_PASS,
        },
      });

      const mailOptions = {
        from: 'noreplay@gmail.com',
        to: newReservation.email,
        subject: 'Table Booking Confirmation',
        html: `
        <html>
        <head>
        <style>
        /* Materialistic Style */
        body {
          font-family: 'Montserrat', sans-serif;
          color: #4d4d4d;
          background-color: #f7f7f7;
        }
      
        table {
          border-collapse: collapse;
          width: 100%;
          margin-bottom: 20px;
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
      
        th {
          color: #c4c4c4;
          font-weight: 500;
          text-align: left;
          padding: 15px 20px;
          font-size: 14px;
          border-bottom: 1px solid #e6e6e6;
          text-transform: uppercase;
        }
      
        td {
          padding: 15px 20px;
          font-size: 16px;
          border-bottom: 1px solid #e6e6e6;
        }
      
        tr:last-child td {
          border-bottom: none;
        }
      
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
      
        .logo {
          display: block;
          margin: 0 auto;
          max-width: 200px;
        }
      
        .wrapper {
          padding: 50px 0;
          text-align: center;
        }
      
        h1 {
          font-size: 36px;
          margin-bottom: 20px;
          text-transform: uppercase;
          color: #333;
        }
      
        p {
          font-size: 18px;
          margin-bottom: 20px;
          color: #555;
          line-height: 1.5;
        }
      
        .button {
          display: inline-block;
          background-color: #F1C40F;
          color: #fff;
          padding: 10px 20px;
          border-radius: 5px;
          text-decoration: none;
          margin-top: 30px;
          font-weight: bold;
          transition: background-color 0.3s ease;
        }
      
        .button:hover {
          background-color: #D4AC0D;
        }
      </style>
      
        </head>
        <body>
          <div class="container">
            <h1>Table Booking Confirmation</h1>
            <p>Dear ${newReservation.clientName},</p>
            <p>Thank you for booking a table at our restaurant! We are looking forward to welcoming you soon.</p>
            <table>
              <tr>
                <th>Booking Details</th>
              </tr>
              <tr>
                <td><strong>Name:</strong></td>
                <td>${newReservation.clientName}</td>
              </tr>
              <tr>
                <td><strong>Email:</strong></td>
                <td>${newReservation.email}</td>
              </tr>
              <tr>
                <td><strong>Phone:</strong></td>
                <td>${newReservation.number ? newReservation.number : '-'}</td>
              </tr>
              <tr>
                <td><strong>Date:</strong></td>
                <td>${newReservation.date ? newReservation.date : '-'}</td>
              </tr>
              <tr>
                <td><strong>Time:</strong></td>
                <td>${newReservation.time ? newReservation.time : '-'}</td>
              </tr>
              <tr>
                <td><strong>Number of Persons:</strong></td>
                <td>${
                  newReservation.persons ? newReservation.persons : '-'
}</td>
              </tr>
              <tr>
                <td><strong>Message:</strong></td>
                <td>${
                  newReservation.message ? newReservation.message : '-'
}</td>
              </tr>
            </table>
            <p>If you have any questions or need to make changes to your booking, please do not hesitate to contact us.</p>
            <p>Thank you again for choosing our restaurant. We look forward to serving you!</p>
            <h2>Best regards,</h2>
            <h3>The Restaurant Team</h3>
          </div>
        </body>
        </html>
        
      
        `,
      };

      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          console.log(err);
        }
      });
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
      const updatedReservation = await TableBooking.updateOne({
        id: req.params.id,
      }).set(req.body);
      if (!updatedReservation) {
        return res.notFound('Table booking not found');
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
      const deletedReservation = await TableBooking.destroyOne({
        id: req.params.id,
      });
      if (!deletedReservation) {
        return res.notFound('Table booking not found');
      }
      return res.ok('Reservation deleted successfully');
    } catch (err) {
      return res.serverError(err);
    }
  },
};
