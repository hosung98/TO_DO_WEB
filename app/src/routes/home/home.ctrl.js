"use strict";

const process = {
  register: (req, res) => {
    res.render("home/register")
  },
};

const show = {
  home: (req, res) => {
    res.render("home/index");
  },
  login: (req, res) => {
    res.render("home/login");
  },
};

module.exports = {
  show,
  process,
};