const pactum = require('pactum');

/**
 * TEST 1: Is registration successful, and does the form return a JSON?
 */
describe("This endpoint registers new users to the db", async () => {
    it("Adds a new user", async () => {
        await pactum.spec()
            .post("http://localhost:5000/user-profile-registration")
            .withJson({
                first_name: "John",
                last_name: "Doe",
                email_add: "johndoe.com",
                country_of_residence: "England",
                gender: "Male",
                password: "thisisthepass",
            })
            .expectJsonMatchStrict({msg: "user registered"})
            .expectStatus(200);
    })
});

/**
 * TEST 2: Does the method return user list?
 */
describe("This endpoint prints user list to console", async () => {
    it("Gets user list", async () => {
        await pactum.spec()
            .get("http://localhost:5000/user-list")
            .expectStatus(200);
    })
});

/**
 * TEST 3: Does the method update an existing user's email address?
 */
describe("This endpoint updates a user's email address", async () => {
    it("Updates user's email address", async () => {
        await pactum.spec()
            .put("http://localhost:5000/email-update")
            .expectJsonMatchStrict({msg: "user email updated"})
            .expectStatus(200);
    })
});

/**
 * TEST 4: Does the method delete an existing user from the db?
 */
describe("This endpoint deletes a given user", async () => {
    it("Deletes a user given their email address", async () => {
        await pactum.spec()
            .delete("http://localhost:5000/user-deletion")
            .expectJsonMatchStrict({msg: "user deleted"})
            .expectStatus(200);
    })
});



