"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = void 0;
const src_1 = require("src");
const promises_1 = require("fs/promises");
const app_error_1 = require("src/shared/app-error");
const http_status_codes_1 = require("http-status-codes");
const deleteCategory = async ({ id, }) => {
    try {
        const category = await src_1.db.category.delete({
            where: {
                id: Number(id),
            },
        });
        await (0, promises_1.unlink)("uploads" + category.image);
        return category;
    }
    catch {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid ID");
    }
};
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=delete-category.service.js.map