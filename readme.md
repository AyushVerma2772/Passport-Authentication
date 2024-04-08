# Authentication with Passport.js in Node.js

Authentication in Node.js is commonly done using passport.js or JWT (JSON Web Token), with the local strategy being the most common approach.

## Overview
- **Passport**: A tool or library for authentication.
- **Passport-local**: A strategy for authenticating with a username and password.
- **Passport-local-mongoose**: Used to perform hashing and salting for password security.

## Steps for Authentication with Passport
1. **Create a User Schema**: Define a user schema without the username and password fields initially.
2. **Add Passport-local-mongoose Plugin**: Use the plugin to add username and password fields to the user schema.
3. **Create a User Model**: Create a user model using mongoose.
4. **Create Authentication Routes**: Set up authentication routes and use them in the main application file (index.js).
5. **Initialize Passport**: Initialize passport and give it access to the session.
6. **Configure Passport Strategies**: Use serializeUser, deserializeUser, and LocalStrategy with passport.
7. **Handle Signup Form**: Handle signup form submissions and create new users using the register method.
8. **Handle Login Form**: Handle login form submissions using the passport.authenticate middleware.
9. **Handle Logout**: Implement logout functionality.

## Code Example

// Step 1: Create a User Schema
```javascript
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    // Define other user properties
});

userSchema.plugin(passportLocalMongoose);

const UserModel = mongoose.model("User", userSchema);
```

// Step 2: Initialize Passport and Configure Strategies
```javascript
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());
passport.use(new LocalStrategy(UserModel.authenticate()));
```

// Step 3: Handle Signup Form
```javascript
const newUser = await UserModel.register(user, password);
```

// Step 4: Handle Login Form
```javascript
router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
    res.render("home");
});
```

// Step 5: Handle Logout
