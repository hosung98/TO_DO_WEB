"use strict";

const express = require("express");
const router = express.Router();

let ctrl = require("./home.ctrl");

router.get("/", ctrl.home);

// 외부로 내보내기
module.exports = router;
