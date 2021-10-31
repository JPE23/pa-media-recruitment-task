/**
 * AUTHOR: James Easy
 */

/**
 * IMPORTS
 * @type {e | (() => Express)}
 */
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const database = require("./database");
const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const helmet = require('helmet');
const db = database;


/**
 * EXPRESS
 */
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Basic CRUD API by James E.',
            version: '1.0.0',
        }
    },
    apis: ['server.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/**
 * CORS implemented so that we don"t get errors when trying to access the
 * server from a different server location
 */
app.use(cors({}));

/**
 * Helmet implemented to secure HTTP headers
 */
app.use(helmet());

/**
 * Allows JSON parsing
 */
app.use(bodyParser.json());

/**
 * DB Initialised
 */
let users = db.addCollection('users');

/**
 * @swagger
 * /user-profile-registration:
 *  post:
 *      description: Registers new user and returns success message
 *      parameters:
 *      - name: first name
 *        description: first name of user
 *        in: formData
 *        required: true
 *        type: String
 *      - name: last name
 *        description: last name of user
 *        in: formData
 *        required: true
 *        type: String
 *      - name: email address
 *        description: user email address
 *        in: formData
 *        required: true
 *        type: String
 *      - name: country
 *        description: user's country of residence
 *        in: formData
 *        required: true
 *        type: String
 *      - name: gender
 *        description: user's gender
 *        in: formData
 *        required: true
 *        type: String
 *      - name: password
 *        description: user's password
 *        in: formData
 *        required: true
 *        type: String
 *      - name: password re-entry
 *        description: user's password
 *        in: formData
 *        required: true
 *        type: String
 *      responses:
 *          200:
 *              description: Success
 */
app.post('/user-profile-registration', (req, res) => {
    const {
        firstName,
        lastName,
        emailAdd,
        countryOfResidence,
        gender,
        password,
    } = req.body;
    users.insert({
        first_name: firstName,
        last_name: lastName,
        email_add: emailAdd,
        country_of_residence: countryOfResidence,
        gender: gender,
        password: password,
    });
    return res.json({msg: "user registered"})
});

/**
 * @swagger
 * /user-list:
 *  get:
 *      description: Queries DB for new users and returns them to client
 *      responses:
 *          200:
 *              description: Success
 */
app.get('/user-list', (req, res) => {
    return res.json(users);
})

/**
 * @swagger
 * /email-update:
 *  put:
 *      description: Updates user email address
 *      parameters:
 *      - name: current email address
 *        description: user's current email address
 *        in: formData
 *        required: true
 *        type: String
 *      - name: new email address
 *        description: user's new email address
 *        in: formData
 *        required: true
 *        type: String
 *      responses:
 *          200:
 *              description: Success
 */
app.put("/email-update", (req, res) => {
    let update = users.findObject({"email_add": req.body.oldEmail})
    update.email_add = req.body.newEmail;
    users.update(update);
    return res.json({msg: "user email updated"})
})

/**
 * @swagger
 * /user-deletion:
 *  delete:
 *      description: Delete user from db
 *      parameters:
 *      - name: email address
 *        description: email address of user to be deleted
 *        in: formData
 *        required: true
 *        type: String
 *      responses:
 *          200:
 *              description: Success
 */
app.delete('/user-deletion', (req, res) => {
    let rm = users.findObject({"email_add": req.body.email})
    users.remove(rm);
    return res.json({msg: "user deleted"})
})

/**
 * PORT SETTINGS
 * @type {string|number}
 */
const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}, http://localhost:${port}`));