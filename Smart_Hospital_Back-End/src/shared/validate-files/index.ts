import { Request, Response, NextFunction, RequestHandler } from "express";
import multer from "multer";
import path from "path";

type FileSpec = {
  required: boolean;
  mimeTypes?: string[];
};

type FileValidationConfig = Record<string, FileSpec>;

export function validateFiles(config: FileValidationConfig): RequestHandler {
  const upload = multer({
    storage: multer.diskStorage({
      destination: path.join(process.cwd(), "uploads"),
      filename: function (req, file, cb) {
        // Customize filename if needed (e.g. add timestamp)
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      },
    }),
  });

  const fields = Object.keys(config).map((name) => ({ name, maxCount: 1 }));
  const uploadMiddleware = upload.fields(fields);

  return (req: Request, res: Response, next: NextFunction) => {
    uploadMiddleware(req, res, (err) => {
      if (err) return res.status(400).json({ error: err.message });

      for (const [field, spec] of Object.entries(config)) {
        const fileArray = (
          req.files as Record<string, Express.Multer.File[]>
        )?.[field];

        if (spec.required && (!fileArray || fileArray.length === 0)) {
          return res.status(400).json({ [field]: `Missing required file` });
        }

        if (
          spec.mimeTypes &&
          fileArray?.[0] &&
          !spec.mimeTypes.includes(fileArray[0].mimetype)
        ) {
          return res.status(400).json({ [field]: `Invalid file type` });
        }
      }

      next();
    });
  };
}
