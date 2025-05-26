"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_async_handler_1 = require("express-async-handler");
const receptionist_create_service_1 = require("./receptionist-create.service");
const http_status_codes_1 = require("http-status-codes");
const checkRoles_1 = require("src/shared/middlewares/checkRoles");
const receptionist_service_1 = require("./receptionist.service");
const receptionist_validation_1 = require("./receptionist.validation");
const validate_body_1 = require("src/shared/validate-body");
const receptionist_delete_service_1 = require("./receptionist-delete.service");
const receptionist_update_service_1 = require("./receptionist-update.service");
const validate_files_1 = require("src/shared/validate-files");
const receptionistRouter = (0, express_1.Router)();
receptionistRouter.post("/create-receptionist", (0, validate_files_1.validateFiles)({
    image: {
        required: false,
        mimeTypes: ["image/png", "image/jpg", "image/jpeg"],
    },
}), (0, validate_body_1.validateBody)(receptionist_validation_1.createReceptionistSchema), (0, express_async_handler_1.default)(async (req, res) => {
    const receptionist = await (0, receptionist_create_service_1.createReceptionist)(req.body, req.file);
    res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json({ receptionist, message: "Successful" });
}));
receptionistRouter.delete("/delete-receptionist/:id", (0, checkRoles_1.checkRoles)(["admin"]), (0, express_async_handler_1.default)(async (req, res) => {
    const receptionist = await (0, receptionist_delete_service_1.deleteReceptionist)(req.params.id);
    res.status(http_status_codes_1.StatusCodes.OK).json({ receptionist, message: "Successful" });
}));
receptionistRouter.patch("/update-receptionist/:id", (0, checkRoles_1.checkRoles)(["receptionist", "admin"]), (0, validate_body_1.validateBody)(receptionist_validation_1.updateReceptionistSchema), (0, express_async_handler_1.default)(async (req, res) => {
    const receptionist = await (0, receptionist_update_service_1.updateReceptionist)(req.params.id, req.body);
    res.status(http_status_codes_1.StatusCodes.OK).json({ receptionist, message: "Successful" });
}));
receptionistRouter.get("/receptionist/:id", (0, express_async_handler_1.default)(async (req, res) => {
    const id = req.params.id;
    const receptionist = await (0, receptionist_service_1.getReceptionistById)(id);
    res.status(http_status_codes_1.StatusCodes.OK).json(receptionist);
}));
exports.default = receptionistRouter;
//# sourceMappingURL=receptionist.controller.js.map