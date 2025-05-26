"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFiles = validateFiles;
const multer_1 = require("multer");
const path_1 = require("path");
function validateFiles(config) {
    const upload = (0, multer_1.default)({
        storage: multer_1.default.diskStorage({
            destination: path_1.default.join(process.cwd(), "uploads"),
            filename: function (req, file, cb) {
                const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
                const ext = path_1.default.extname(file.originalname);
                cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
            },
        }),
    });
    const fields = Object.keys(config).map((name) => ({ name, maxCount: 1 }));
    const uploadMiddleware = upload.fields(fields);
    return (req, res, next) => {
        uploadMiddleware(req, res, (err) => {
            if (err)
                return res.status(400).json({ error: err.message });
            for (const [field, spec] of Object.entries(config)) {
                const fileArray = req.files?.[field];
                if (spec.required && (!fileArray || fileArray.length === 0)) {
                    return res.status(400).json({ [field]: `Missing required file` });
                }
                if (spec.mimeTypes &&
                    fileArray?.[0] &&
                    !spec.mimeTypes.includes(fileArray[0].mimetype)) {
                    return res.status(400).json({ [field]: `Invalid file type` });
                }
            }
            next();
        });
    };
}
//# sourceMappingURL=index.js.map