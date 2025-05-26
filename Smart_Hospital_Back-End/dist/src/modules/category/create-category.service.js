"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = void 0;
const http_status_codes_1 = require("http-status-codes");
const src_1 = require("src");
const app_error_1 = require("src/shared/app-error");
const createCategory = async ({ name, image, description, link, }) => {
    const exist = await src_1.db.category.findUnique({
        where: { name },
    });
    if (exist) {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Category already exists");
    }
    const imagePath = "/" + image.filename;
    const category = await src_1.db.category.create({
        data: {
            name,
            image: imagePath,
            description,
            link,
        },
    });
    return category;
};
exports.createCategory = createCategory;
//# sourceMappingURL=create-category.service.js.map