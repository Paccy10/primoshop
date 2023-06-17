import path from "path";
import { Express, Request, Response, Router } from "express";
import multer, { FileFilterCallback } from "multer";

const router = Router();

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ) => {
    cb(null, path.join(__dirname, "../../../uploads"));
  },
  filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const checkFileType = (file: Express.Multer.File, cb: FileFilterCallback) => {
  const fileTypes = /jpg|jpeg|png/;
  const extname = fileTypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );
  const mimeType = fileTypes.test(file.mimetype);
  if (extname && mimeType) {
    return cb(null, true);
  }
  cb(new Error("The file is not an image"));
};

const upload = multer({ storage });

router.post("/", upload.single("image"), (req: Request, res: Response) => {
  const file = req.file;
  const foldersNames = file?.destination.split("/") || [];
  const uploadsFolderName = foldersNames[foldersNames?.length - 1];
  res.send({
    message: "Image Uploaded",
    image: `/${uploadsFolderName}/${file?.filename}`,
  });
});

export default router;
