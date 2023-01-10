const express = require("express");
const { getRepsitories } = require("../Controller/githubController");
const router = express.Router();

router.get("/:userName", getRepsitories);

module.exports = router;
