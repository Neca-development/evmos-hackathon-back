import { IFile } from '../interfaces/file.interface';

export class FileInfoUtil {
  static mapMulterFile(buffer: Buffer, extension: string, name: string): IFile {
    const file: IFile = {
      name,
      buffer,
      extension
    }

    return file
  }
}
