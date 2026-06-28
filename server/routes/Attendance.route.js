import express from 'express'
import { HandleInitializeAttendance, HandleAllAttendance, HandleAttendance, HandleUpdateAttendance, HandleMyAttendance, HandleDeleteAttendance } from '../controllers/Attendance.controller.js'
import { VerifyEmployeeToken, VerifyhHRToken } from '../middlewares/Auth.middleware.js'
import { RoleAuthorization } from '../middlewares/RoleAuth.middleware.js'

const router = express.Router()

router.post("/initialize", VerifyEmployeeToken, HandleInitializeAttendance)

router.post("/initialize-hr", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleInitializeAttendance)

router.get("/all", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleAllAttendance)

router.get("/my-attendance", VerifyEmployeeToken, HandleMyAttendance)

router.get("/:attendanceID", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleAttendance)

router.post("/update-attendance", VerifyEmployeeToken, HandleUpdateAttendance)

router.delete("/delete-attendance/:attendanceID", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleDeleteAttendance)

export default router