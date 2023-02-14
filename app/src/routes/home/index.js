"use strict";

const express = require("express");
const router = express.Router();

let ctrl = require("./home.ctrl");

router.get("/", ctrl.show.login);
router.get("/login", ctrl.show.home);
router.get("/register", ctrl.process.register); 

// 외부로 내보내기
module.exports = router;
