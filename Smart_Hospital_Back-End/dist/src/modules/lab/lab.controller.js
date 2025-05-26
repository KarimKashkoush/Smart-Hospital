"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_async_handler_1 = require("express-async-handler");
const http_status_codes_1 = require("http-status-codes");
const validate_body_1 = require("src/shared/validate-body");
const lab_validation_1 = require("./lab.validation");
const create_lab_receptionist_service_1 = require("./create-lab-receptionist.service");
const set_lab_receptionist_salary_service_1 = require("./set-lab-receptionist-salary.service");
const checkRoles_1 = require("src/shared/middlewares/checkRoles");
const validate_files_1 = require("src/shared/validate-files");
const create_lab_test_service_1 = require("./create-lab-test.service");
const set_lab_test_status_service_1 = require("./set-lab-test-status.service");
const attach_results_service_1 = require("./attach-results.service");
const get_lab_tests_service_1 = require("./get-lab-tests.service");
const zod_1 = require("zod");
const app_error_1 = require("src/shared/app-error");
const set_lab_test_approval_service_1 = require("./set-lab-test-approval.service");
const labRouter = (0, express_1.Router)();
labRouter.post("/create-lab-receptionist", (0, validate_body_1.validateBody)(lab_validation_1.createLabReceptionistSchema), (0, express_async_handler_1.default)(async (req, res) => {
    const labReceptionist = await (0, create_lab_receptionist_service_1.createLabReceptionist)(req.body);
    res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json({ labReceptionist, message: "Successful" });
}));
labRouter.post("/set-lab-receptionist-salary", (0, checkRoles_1.checkRoles)(["admin"]), (0, validate_body_1.validateBody)(lab_validation_1.setLabReceptionistSalarySchema), (0, checkRoles_1.checkRoles)(["admin"]), (0, express_async_handler_1.default)(async (req, res) => {
    const labReceptionist = await (0, set_lab_receptionist_salary_service_1.setLabReceptionistSalary)(req.body);
    res.status(http_status_codes_1.StatusCodes.OK).json({ labReceptionist, message: "Successful" });
}));
labRouter.post("/create-lab-test", (0, checkRoles_1.checkRoles)(["doctor", "lab"]), (0, validate_files_1.validateFiles)({
    attachment: {
        required: false,
        mimeTypes: [
            "application/pdf",
            "image/jpg",
            "image/png",
            "image/jpeg",
            "application/docs",
        ],
    },
}), (0, validate_body_1.validateBody)(lab_validation_1.createLabTestSchema), (0, express_async_handler_1.default)(async (req, res) => {
    const labTest = await (0, create_lab_test_service_1.createLabTest)({
        ...req.body,
        attachment: req.files?.["attachment"]?.[0],
    });
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ labTest, message: "Successful" });
}));
labRouter.post("/lab-test-status/:id", (0, checkRoles_1.checkRoles)(["lab"]), (0, validate_body_1.validateBody)(zod_1.z.object({ status: zod_1.z.enum(["completed", "pending"]) })), (0, express_async_handler_1.default)(async (req, res) => {
    const labTest = await (0, set_lab_test_status_service_1.setLabTestStatus)({
        id: Number(req.params.id),
        status: req.body.status,
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ labTest, message: "Successful" });
}));
labRouter.post("/lab-test/attach-results/:id", (0, checkRoles_1.checkRoles)(["lab"]), (0, validate_files_1.validateFiles)({
    attachment: {
        mimeTypes: [
            "application/pdf",
            "application/msword",
            "image/jpg",
            "image/jpeg",
            "image/png",
        ],
        required: true,
    },
}), (0, express_async_handler_1.default)(async (req, res) => {
    const labTest = await (0, attach_results_service_1.attachResutls)({
        id: Number(req.params.id),
        file: req.files["attachment"][0],
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ labTest, message: "Successful" });
}));
labRouter.get("/lab-tests", (0, checkRoles_1.checkRoles)(["lab"]), (0, express_async_handler_1.default)(async (req, res) => {
    const filter = req.query?.filter?.toString();
    if (filter && !["all", "accepted"].includes(filter)) {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "The filter query param must either be `all` or `accepted`");
    }
    const labTest = await (0, get_lab_tests_service_1.getLabTests)({
        filter: filter === "accepted" ? "accepted" : "all",
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ labTest, message: "Successful" });
}));
labRouter.post("/lab-test-approval/:id", (0, checkRoles_1.checkRoles)(["lab"]), (0, validate_body_1.validateBody)(zod_1.z.object({ accepted: zod_1.z.boolean() })), (0, express_async_handler_1.default)(async (req, res) => {
    const labTest = await (0, set_lab_test_approval_service_1.setLabTestApproval)({
        id: Number(req.params.id),
        accepted: req.body.accepted,
    });
    if (labTest)
        res.status(http_status_codes_1.StatusCodes.OK).json({ labTest, message: "Successful" });
    if (!labTest)
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: "Successful" });
}));
const get_lab_receptionist_service_1 = require("./get-lab-receptionist.service");
labRouter.get("/get-lab-receptionist/:id", (0, express_async_handler_1.default)(async (req, res) => {
    const labReceptionist = await (0, get_lab_receptionist_service_1.getLabReceptionistDetails)(req.params.id);
    res.status(http_status_codes_1.StatusCodes.OK).json({ labReceptionist, message: "Successful" });
}));
exports.default = labRouter;
//# sourceMappingURL=lab.controller.js.map