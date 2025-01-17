const express = require("express");

const authRoutes = require("./auth.route");
const tenantRoutes = require("./tenant.route");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/tenant", tenantRoutes);

module.exports = router;
