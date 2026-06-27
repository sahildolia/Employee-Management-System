import express from "express"
import { HandleCreateNotice, HandleAllNotice, HandleNotice, HandleMyNotices, HandleUpdateNotice, HandleDeleteNotice } from "../controllers/Notice.controller.js"
import { VerifyhHRToken, VerifyEmployeeToken } from "../middlewares/Auth.middleware.js"
import { RoleAuthorization } from "../middlewares/RoleAuth.middleware.js"

const router = express.Router()


router.post("/create-notice", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleCreateNotice)

router.get("/all/", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleAllNotice)

router.get("/my-notices", VerifyEmployeeToken, HandleMyNotices)

router.get("/:noticeID", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleNotice)

router.patch("/update-notice", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleUpdateNotice)

router.delete("/delete-notice/:noticeID", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleDeleteNotice) 


export default router