const express = require("express");
const { login, logout, checkAuth } = require("../controllers/authController");
const verifyAdminToken = require("../middleware/protected");
const router = express.Router();

router.post("/login", login)
router.post("/logout",verifyAdminToken, logout)
router.get("/isAuthenticated",verifyAdminToken, checkAuth)
module.exports = router;
