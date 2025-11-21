const express = require("express")
const { submitInquiryForm, getInquiry } = require("../controllers/inquiry.controller")
const verifyAdminToken = require("../middleware/protected")

const router = express.Router()

router.post("/addInquiry", submitInquiryForm)
router.get("/getInquiry", verifyAdminToken ,getInquiry)

module.exports = router