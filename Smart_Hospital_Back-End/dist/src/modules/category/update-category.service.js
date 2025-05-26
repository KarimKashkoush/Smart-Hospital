"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOneCategory = void 0;
const http_status_codes_1 = require("http-status-codes");
const src_1 = require("src");
const app_error_1 = require("src/shared/app-error");
const promises_1 = require("fs/promises");
const updateOneCategory = async ({ name, image, id, }) => {
    if (!image && !name) {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "You need to specify at least one of the following data: `name`, `image`");
    }
    try {
        const category = await src_1.db.category.findUnique({
            where: { id: Number(id) },
        });
        const imagePath = "/" + image.filename;
        const newCategory = await src_1.db.category.update({
            where: {
                id: Number(id),
            },
            data: {
                ...(name ? { name } : {}),
                ...(image ? { image: imagePath } : {}),
            },
        });
        await (0, promises_1.unlink)("uploads" + category.image);
        return newCategory;
    }
    catch {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid ID");
    }
};
exports.updateOneCategory = updateOneCategory;
//# sourceMappingURL=update-category.service.js.map