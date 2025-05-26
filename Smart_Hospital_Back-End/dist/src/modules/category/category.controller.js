"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_category_service_1 = require("./create-category.service");
const checkRoles_1 = require("src/shared/middlewares/checkRoles");
const zod_1 = require("zod");
const validate_body_1 = require("src/shared/validate-body");
const validate_files_1 = require("src/shared/validate-files");
const express_async_handler_1 = require("express-async-handler");
const http_status_codes_1 = require("http-status-codes");
const get_category_service_1 = require("./get-category.service");
const delete_category_service_1 = require("./delete-category.service");
const update_category_service_1 = require("./update-category.service");
const get_category_doctors_service_1 = require("./get-category-doctors.service");
const categoryRouter = (0, express_1.Router)();
const createSchema = zod_1.default.object({
    name: zod_1.default.string(),
});
const updateSchema = zod_1.default.object({
    name: zod_1.default.string().optional(),
});
categoryRouter.post("/create-category", (0, validate_files_1.validateFiles)({
    image: {
        required: true,
        mimeTypes: ["image/png", "image/jpg", "image/jpeg"],
    },
}), (0, validate_body_1.validateBody)(createSchema), (0, express_async_handler_1.default)(async (req, res) => {
    const category = await (0, create_category_service_1.createCategory)({
        name: req.body.name,
        description: req.body.description,
        link: req.body.link,
        image: req.files["image"][0],
    });
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ category, message: "Successful" });
}));
categoryRouter.get("/get-categories", (0, express_async_handler_1.default)(async (_, res) => {
    const categories = await (0, get_category_service_1.getCategories)();
    res.status(http_status_codes_1.StatusCodes.OK).json({ categories, message: "Successful" });
}));
categoryRouter.get("/get-category-doctors/:id", (0, express_async_handler_1.default)(async (req, res) => {
    const doctors = await (0, get_category_doctors_service_1.getCategoryDoctors)(req.params.id);
    res.status(http_status_codes_1.StatusCodes.OK).json({ doctors, message: "Successful" });
}));
categoryRouter.delete("/delete-category/:id", (0, checkRoles_1.checkRoles)(["admin"]), (0, express_async_handler_1.default)(async (req, res) => {
    const category = await (0, delete_category_service_1.deleteCategory)({ id: req.params.id });
    res.status(http_status_codes_1.StatusCodes.OK).json({ category, message: "Successful" });
}));
categoryRouter.patch("/update-category/:id", (0, checkRoles_1.checkRoles)(["admin"]), (0, validate_files_1.validateFiles)({
    image: {
        required: false,
        mimeTypes: ["image/png", "image/jpg", "image/jpeg"],
    },
}), (0, validate_body_1.validateBody)(updateSchema), (0, express_async_handler_1.default)(async (req, res) => {
    const category = await (0, update_category_service_1.updateOneCategory)({
        name: req.body.name,
        image: req.files?.["image"]?.[0],
        id: req.params.id,
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ category, message: "Successful" });
}));
exports.default = categoryRouter;
//# sourceMappingURL=category.controller.js.map