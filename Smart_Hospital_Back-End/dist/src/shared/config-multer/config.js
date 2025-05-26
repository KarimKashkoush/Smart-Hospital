"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = require("multer");
const path_1 = require("path");
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
        cb(null, uniqueName);
    },
});
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
    const extname = path_1.default.extname(file.originalname).toLowerCase();
    const allowedExt = [".jpeg", ".jpg", ".png", ".pdf"];
    if (allowedMimeTypes.includes(file.mimetype) && allowedExt.includes(extname)) {
        cb(null, true);
    }
    else {
        cb(new Error("Invalid file type"));
    }
};
exports.upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: {
        fileSize: 4 * 1024 * 1024,
    },
});
//# sourceMappingURL=config.js.map