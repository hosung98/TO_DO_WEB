"use strict";

const home = (req, res) => {
  res.render("home/login");
};

const register = (req, res) => {
  res.render("home/register");
};

const main = (req, res) => {
  res.render("home/main");
};

module.exports = {
  home, 
  main,
  register,
};