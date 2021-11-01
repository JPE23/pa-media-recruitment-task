**BASIC CRUD APPLICATION by James E.**
####
- **Application features**
  - Allows the **creation** of new users
  - Allows the **reading** of the current list of users and prints the user 
    array to the console
  - Allows user email addresses to be **updated** by passing in the current 
    email address and the new desired email address
  - Allows users to be **deleted** via their email address
####
  - **Familiar Skills**
    - Prior to this exercise, I was familiar with `ReactJS`, `NodeJS`, 
      `ExpressJS`, `Git` and `Mocha`.
####
  - **New skills/tools used**
    - I was not familiar with in-memory databases, having previously worked with 
      regular disk based databases in `PostgreSQL`.
    - I was unfamiliar with `Pactum` which I used for unit testing
    - I was also unfamiliar with the extras: `Docker` and `Swagger`
####
  - **Implementation**
    - For the in-memory database I used `LokiJS`. I had considered using 
      `better-SQLite3`, but the documentation was not immediately clear and, given the time 
      constraints, I just needed something that worked quickly. In the long term,
      I think this was a wiser decision for me, since I am already familiar with 
      SQL based databases, and I have now added knowledge of another tool to my 
      skillset.
####
- Tech used: 
  - `ReactJS`
  - `NodeJS`
  - `ExpressJS`
  - `LokiJS`
  - `Bcrypt`
  - `Pactum`
  - `Mocha`
  - `React-Testing-Library`
  - `GitLab`
  - `Docker`
  - `Swagger`
####
- Commands
  - `docker-compose run app`
  - `npm start`
  - `npm test`

####
- Ports/URLs
  - `localhost:3000`
  - `localhost:5000`
  - `localhost:5000/api-docs`
  