import { existsSync, mkdirSync, writeFileSync } from "fs";
import { v4 as uuidv4 } from "uuid";
import { MIME_TYPES, FOLDER } from "./consts";

export function uploadFile(file): string {
  const { originalname, buffer, mimetype } = file;
  const folder = FOLDER;
  const imgName = originalname.split(".")[0] + "_" + uuidv4() + MIME_TYPES[mimetype];
  const fileName = folder + "/" + imgName;
  if (!existsSync(folder)) {
    mkdirSync(folder, { recursive: true });
  }
  writeFileSync(fileName, buffer);

  return imgName;
}
