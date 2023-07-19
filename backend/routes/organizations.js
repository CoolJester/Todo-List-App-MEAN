const express = require("express");

const organizations = require("../controllers/organizations");

const router = express.Router();

router.get("/organizations", organizations.getOrganizations);

module.exports = router;
