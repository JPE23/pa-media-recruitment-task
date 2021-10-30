/**
 * AUTHOR: James Easy
 */

/**
 * Imports
 */
import React, {useState} from "react";
import $ from "jquery";
import './App.css';

/**
 * APPLICATION MAIN FUNCTION
 * @returns {JSX.Element}
 * @constructor
 */
function App() {

    /**
     * USE STATE DECLARATIONS
     */
    let [registration, setRegistration] = useState();
    let [users, setUsers] = useState([false]);
    let [update, setUpdate] = useState();
    let [deletion, setDeletion] = useState();

    /**
     * POST: REGISTERS NEW USER IN THE DATABASE
     * @param e
     */
    const registerUserProfile = (e) => {
        e.preventDefault();
        fetch("http://localhost:5000/user-profile-registration", {
            method: "POST",
            body: $("#user-profile").serialize(),
            headers: {"Content-Type": "application/x-www-form-urlencoded"}
        }).then((res) => {
            res.json().then(r => {
                setRegistration(true);
            });
        });
    };

    /**
     * GET: RETRIEVES ALL USERS IN DB AND PRINTS TO CONSOLE
     */
    const getUsers = () => {
        fetch("http://localhost:5000/user-list")
            .then((res) => {
                res.json().then(r => {
                    users = r.data;
                    console.log(users)
                })
            })
    }

    /**
     * PUT: UPDATES USER DETAILS
     */
    const updateUserEmail = (e) => {
        e.preventDefault()
        fetch("http://localhost:5000/email-update", {
            method: 'PUT',
            body: $("#updateEmail").serialize(),
            headers: {'Content-Type': "application/x-www-form-urlencoded"}
        }).then((res) => {
            res.json().then(r => {
                setUpdate(true);
            })
        })
    }

    /**
     * DELETE: REMOVES USER FROM DB
     */
    const deleteUser = (e) => {
        e.preventDefault();
        fetch("http://localhost:5000/user-deletion", {
            method: 'DELETE',
            body: $("#deleteUser").serialize(),
            headers: {'Content-Type': "application/x-www-form-urlencoded"}
        }).then((res) => {
            res.json().then(r => {
                setDeletion(true);
            })
        })
    }

    /**
     * RENDERS DOM CONTENT
     */
    return (
        <div className="application-container">
            <h1>BASIC CRUD APPLICATION by James E.</h1>
            <br/>
            <form id="user-profile" className="user-profile"
                  onSubmit={registerUserProfile}>
                <h2>Create a User Profile</h2>
                <input type="text"
                       name="firstName"
                       placeholder="First Name"
                       id="firstName"
                       required
                />
                <input type="text"
                       name="lastName"
                       placeholder="Last Name"
                       id="lastName"
                       required
                />
                <input type="email"
                       name="emailAdd"
                       placeholder="Email Address"
                       id="emailAdd"
                       defaultValue=""
                       required
                />
                <select type="text"
                        name="countryOfResidence"
                        list="countryDropdown"
                        id="countryOfResidence"
                        defaultValue=""
                        required>
                    <option value="" disabled>Country</option>
                    <option value="England">England</option>
                    <option value="Northern Ireland">Northern Ireland</option>
                    <option value="Scotland">Scotland</option>
                    <option value="Wales">Wales</option>
                </select>
                <select type="text"
                        name="gender"
                        list="genderDropdown"
                        id="gender"
                        defaultValue=""
                        required>
                    <option value="" disabled>Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-Binary">Non-Binary</option>
                    <option value="Transgender">Transgender</option>
                    <option value="Intersex">Intersex</option>
                    <option value="Abstain">I'd prefer not to say</option>
                </select>
                <input type="password"
                       name="password"
                       placeholder="Password"
                       id="password"
                       autoComplete="on"
                       required
                />
                <input type="password"
                       name="confirmPassword"
                       id="confPass"
                       placeholder="Confirm Password"
                       autoComplete="on"
                       required
                />
                <button type="submit"
                        id="reg-btn"
                        onClick={(e) => {registerUserProfile(e)}}>Register
                </button>
            </form>
            {registration ? <h3>Registration successful!</h3> : null}
            <br/>
            <h2>Read and Print User Profiles</h2>
            <button onClick={() => {
                getUsers()
                setUsers(true)
            }}>List Registered Users
            </button>
            <br/>
            <br/>
            <h2>Update User Email Address</h2>
            <form id="updateEmail" onSubmit={updateUserEmail}>
                <input type="text" placeholder="Enter old email"
                       name="oldEmail"/>
                <input type="text" placeholder="Enter new email"
                       name="newEmail"/>
                <input type="submit" onClick={(e) => {
                    updateUserEmail(e)
                }} value="Update User Email"/>
            </form>
            {update ? <h3>Update successful!</h3> : null}
            <br/>
            <h2>Delete User</h2>
            <form id="deleteUser" onSubmit={deleteUser}>
                <input type="text" placeholder="Enter email of user to delete"
                       name="email"/>
                <input type="submit" onClick={(e) => {
                    deleteUser(e)
                }} value="Delete"/>
                {deletion ? <h3>Deletion successful!</h3> : null}
            </form>
        </div>
    );
}

export default App;
