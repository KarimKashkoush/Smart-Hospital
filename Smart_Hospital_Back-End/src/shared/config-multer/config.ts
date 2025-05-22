import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, image, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, image, cb) => {
    const name = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, name + path.extname(image.originalname));
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const fileTypes = /jpeg|jpg|png|/;
  const isValid =
    fileTypes.test(file.mimetype) &&
    fileTypes.test(path.extname(file.originalname).toLowerCase());

  if (isValid) {
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
