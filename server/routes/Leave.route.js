import express from 'express'
import { HandleAllLeaves, HandleCreateLeave, HandleEmployeeCreateLeave, HandleMyLeaves, HandleDeleteLeave, HandleLeave, HandleUpdateLeaveByEmployee, HandleUpdateLeavebyHR } from '../controllers/Leave.controller.js'
import { VerifyEmployeeToken, VerifyhHRToken } from '../middlewares/Auth.middleware.js'
import { RoleAuthorization } from '../middlewares/RoleAuth.middleware.js'


const router = express.Router()

router.post("/create-leave", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleCreateLeave)

router.post("/employee-create-leave", VerifyEmployeeToken, HandleEmployeeCreateLeave)

router.get("/all", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleAllLeaves)

router.get("/:leaveID", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleLeave)

router.get("/my-leaves", VerifyEmployeeToken, HandleMyLeaves)

router.patch("/employee-update-leave", VerifyEmployeeToken, HandleUpdateLeaveByEmployee)

router.patch("/HR-update-leave", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleUpdateLeavebyHR)

router.delete("/delete-leave/:leaveID", VerifyEmployeeToken, HandleDeleteLeave)

export default router