// const express = require('express');
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const app = require("../app");
const express = require("express");
const User = require("../models/User.model");

router.get("/signup", (req, res) => {
  res.render("auth/signup");
});
router.post("/signup", async (req, res) => {
  try {
    console.log("The form data: ", req.body);
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    await User.create({
      username: req.body.username,
      password: hashedPassword,
    });
    res.redirect("profile");
  } catch (error) {
    console.log(error);
    res.render('users/profile', { errorMessage: error.message, isConnected: false })
  }
});
router.get("/login", (req, res) => {
  res.render("auth/login", { isConnected: false });
});
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await User.findOne({ username })
    if (!currentUser) {
      // What to do if I don't have a user with this username
      res.render('auth/login', { errorMessage: 'No user with this username', isConnected: false })
    } else {
      // console.log('Found User', currentUser)
      if (bcrypt.compareSync(password, currentUser.password)) {
        console.log('Correct password')
        // What to do if I have a user and the correct password
        /* const sessionUser = structuredClone(currentUser)
        delete sessionUser.password */
        req.session.user = currentUser
        res.redirect('/profile')
      } else {
        // What to do if I have a user and an incorrect password
        res.render('auth/login', { errorMessage: 'Incorrect password !!!', isConnected: false })
      }
    }
})
router.get("/profile", (req, res) => {
  res.render("users/profile")
});

// router.get('/logout', (req, res, next) => {
//   req.session.destroy(err => {
//     if (err) {
//       next(err)
//     }
//     res.redirect('/auth/login')
//   })
// })

module.exports = router;
// module.exports = User;