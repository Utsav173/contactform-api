/**
 * ContactformController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const nodemailer = require('nodemailer');

module.exports = {
  /**
   * Creates a new contact form.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} The created contact form.
   */
  create: async function (req, res) {
    try {
      if (!req.body) {
        return res.badRequest('No request body provided.');
      }
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return res.badRequest('name, email, message All fields are required.');
      }
      const contactForm = await Contactform.create(req.body).fetch();

      // if you want to add this email feauture, uncomment the below

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USERNAME,
          pass: process.env.GMAIL_PASS,
        },
      });

      const mailOptions = {
        from: contactForm.email,
        to: 'noreplay@gmail.com',
        subject: 'New contact created',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f7f7f7; border-radius: 10px;">
            <h2 style="font-size: 24px; color: #333; margin-bottom: 20px;">New Contact Created</h2>
            <div style="background-color: #fff; padding: 20px; border-radius: 10px;">
              <p style="font-size: 18px; color: #333; margin-bottom: 10px;"><strong>Name:</strong> ${contactForm.name}</p>
              <p style="font-size: 18px; color: #333; margin-bottom: 10px;"><strong>Email:</strong> ${contactForm.email}</p>
              <p style="font-size: 18px; color: #333;"><strong>Message:</strong> ${contactForm.message}</p>
            </div>
          </div>
        `,
      };

      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          console.log(err);
        }
      });

      return res.ok(contactForm);
    } catch (error) {
      return res.serverError(error);
    }
  },

  /**
   * Retrieve a contact form by ID and send it as a response.
   * @async
   * @function read
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @throws {NotFoundError} If the contact form is not found.
   * @throws {ServerError} If there is an error retrieving the contact form.
   * @returns {Object} The retrieved contact form.
   */
  read: async function (req, res) {
    try {
      const contactFormId = req.params.id;
      if (!contactFormId) {
        res.notFound('Contact form ID is required.');
      }

      const contactForm = await Contactform.findOne({ id: contactFormId });
      if (!contactForm) {
        return res.notFound(`Contact form with ID ${contactFormId} not found.`);
      }

      return res.ok(contactForm);
    } catch (error) {
      return res.serverError(error);
    }
  },

  /**
   * Update a contact form by its ID with the given request body.
   * @async
   * @function
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @throws {Error} If there is any error while updating the contact form.
   * @returns {Object} The updated contact form if successful, or an error response otherwise.
   */
  update: async function (req, res) {
    try {
      if (!req.params.id) {
        throw new Error('Contact form ID is required.');
      }
      const contactForm = await Contactform.updateOne({
        id: req.params.id,
      }).set(req.body);
      if (!contactForm) {
        return res.notFound();
      }
      return res.ok(contactForm);
    } catch (error) {
      return res.serverError(error);
    }
  },

  /**
   * Deletes a contact form with the given ID.
   *
   * @async
   * @function
   * @param {object} req - The HTTP request object.
   * @param {object} res - The HTTP response object.
   * @throws {Error} - If an error occurs while deleting the contact form.
   * @returns {object} - The deleted contact form.
   */
  delete: async function (req, res) {
    try {
      if (!req.params.id) {
        throw new Error('Contact form ID is required.');
      }
      const contactForm = await Contactform.destroyOne({ id: req.params.id });
      if (!contactForm) {
        return res.notFound();
      }
      return res.ok(contactForm);
    } catch (error) {
      return res.serverError(error);
    }
  },

  /**
   * Finds all contact forms and sends them as a response.
   * @async
   * @function
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @returns {Object} The HTTP response object with the contact forms as the body.
   * @throws {Object} The error object if the query fails.
   */
  find: async function (req, res) {
    try {
      const contactForms = await Contactform.find();
      return res.ok(contactForms);
    } catch (error) {
      return res.serverError(error);
    }
  },
};
