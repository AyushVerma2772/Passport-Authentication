//* Step 4. Create auth route and use it in index.js 
const express = require("express");
const UserModel = require("../models/UserModel");
const passport = require("passport");

const router = express.Router();


router.get("/signup", (req, res) => {
    res.render("signup");
})

//* Step 7. Handle signup form and create new user using register method
router.post("/signup", async (req, res) => {
    try {
        const { username, password, email, gender } = req.body;
        const user = new UserModel({ username, email, gender });
        const newUser = await UserModel.register(user, password);
        res.redirect("/")

    } catch (error) {
        res.send("User already exist")
    }
})


router.get("/login", (req, res) => {
    res.render("login");
})

//* Step 8. Handle login form using passport.authenticate middle ware
router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
    res.redirect("/");
});


//* Step 9. Handle logout 
router.post('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/login');
    });
});


module.exports = router;
