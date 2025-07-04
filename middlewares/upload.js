import multer from "multer";
import path from "node:path";
import { v4 as uuidv4 } from "uuid";

import HttpError from "../helpers/HttpError.js";

const destination = path.resolve("temp");

const storage = multer.diskStorage({
  destination,
  filename: (_, file, cb) => {
    const uniquePreffix = `${Date.now()}_${uuidv4()}`;
    const filename = `${uniquePreffix}_${file.originalname}`;
    cb(null, filename);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const fileFilter = (_, file, cb) => {
  const ext = file.originalname.split(".").pop();
  const allowed = ["jpg", "jpeg", "png"];

  if (!allowed.includes(ext)) {
    return cb(
      HttpError(400, `*.${ext} file is not allowed, only ${allowed.join(", ")}`)
    );
  }

  cb(null, true);
};

const upload = multer({
  storage,
  limits,
  fileFilter,
});

export default upload;
