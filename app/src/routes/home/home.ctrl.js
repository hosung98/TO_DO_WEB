"use strict";

const show = {
  home: (req, res) => {
    res.render("home/index");
  },
  login: (req, res) => {
    res.render("home/login");
  },
  register: (req, res) => {
    res.render("home/register")
  },
  main: (req, res) => {
    res.render("home/main")
  },
};

module.exports = {
  show,
};