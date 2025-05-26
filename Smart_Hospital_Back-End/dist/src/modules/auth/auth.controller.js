"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_body_1 = require("src/shared/validate-body");
const auth_validation_1 = require("./auth.validation");
const signin_service_1 = require("./signin.service");
const signup_service_1 = require("./signup.service");
const http_status_codes_1 = require("http-status-codes");
const get_patient_service_1 = require("./get-patient.service");
const express_async_handler_1 = require("express-async-handler");
const authRouter = (0, express_1.Router)();
authRouter.post("/login", (0, validate_body_1.validateBody)(auth_validation_1.signInSchema), (0, express_async_handler_1.default)(async (req, res) => {
    const { token, user } = await (0, signin_service_1.signIn)(req.body);
    res.status(http_status_codes_1.StatusCodes.OK).json({ token, user, message: "Successful" });
}));
authRouter.post("/register", (0, validate_body_1.validateBody)(auth_validation_1.signUpSchema), (0, express_async_handler_1.default)(async (req, res) => {
    const { token, user } = await (0, signup_service_1.signUp)(req.body);
    res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json({ token, user, message: "Successful" });
}));
authRouter.get("/getPatient/:id", (0, express_async_handler_1.default)(async (req, res) => {
    const patient = await (0, get_patient_service_1.getPatientById)(req.params.id);
    res.status(200).json(patient);
}));
const get_all_patients_service_1 = require("./get-all-patients.service");
authRouter.get("/getAllPatients", (0, express_async_handler_1.default)(async (req, res) => {
    const patients = await (0, get_all_patients_service_1.getAllPatients)();
    res.status(http_status_codes_1.StatusCodes.OK).json({ patients });
}));
exports.default = authRouter;
//# sourceMappingURL=auth.controller.js.map