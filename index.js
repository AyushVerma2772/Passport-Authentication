const express = require("express");
const { join } = require("path")
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const UserModel = require("./models/UserModel");
const { isLoggedIn } = require("./middleware");

const app = express();

app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));
app.use(express.urlencoded());

mongoose.connect('mongodb://127.0.0.1:27017/passportAuth')
    .then(() => console.log("DB connected"))
    .catch(err => console.log(err))


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}))



//* Step 5. initialize passport and give access of session to it
app.use(passport.initialize());
app.use(passport.session());

//* Step 6. use serializeUser, deserializeUser and LocalStrategy with passport
// use static serialize and deserialize of model for passport session support
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(UserModel.authenticate()));


app.use(authRoutes)

app.use((req, res, next) => {
    //  make the currently authenticated user available to all views rendered by your application
    res.locals.currentUser = req.user;
    next();
})

app.get("/", isLoggedIn, (req, res) => {
    // console.log()
    res.render("home")
})

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})
