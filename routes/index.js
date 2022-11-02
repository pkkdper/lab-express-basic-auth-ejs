// const express = require("express")
const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// router.get("/profile", (req, res) => {
//   res.render("users/profile")
// });

module.exports = router;
