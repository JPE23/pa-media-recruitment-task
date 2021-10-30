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
const helmet = require('helmet');
const db = database;

/**
 * EXPRESS
 */
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

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
 * POST: Registers new user profile and returns current database state as JSON
 */
app.post("/user-profile-registration", (req, res) => {
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
 * GET: Queries DB for new users and returns them
 */
app.get("/user-list", (req, res) => {
    return res.json(users);
})

/**
 * PUT: Updates user email address
 */
app.put("/email-update", (req, res) => {
    let update = users.findObject({"email_add": req.body.oldEmail})
    update.email_add = req.body.newEmail;
    users.update(update);
    return res.json({msg: "user email updated"})
})

/**
 * DELETE: Delete user from db
 */
app.delete("/user-deletion", (req, res) => {
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