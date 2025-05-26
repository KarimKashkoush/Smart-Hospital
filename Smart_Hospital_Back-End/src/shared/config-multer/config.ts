import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // بنجيب الامتداد من اسم الملف الأصلي
    const ext = path.extname(file.originalname);
    // نستخدم اسم عشوائي + الامتداد
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, uniqueName);
  },
});


const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
  const extname = path.extname(file.originalname).toLowerCase();

  const allowedExt = [".jpeg", ".jpg", ".png", ".pdf"];

  if (allowedMimeTypes.includes(file.mimetype) && allowedExt.includes(extname)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
});
