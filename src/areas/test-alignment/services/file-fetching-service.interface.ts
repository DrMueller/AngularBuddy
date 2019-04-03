import { FilesToAlign } from '../models';

export const FileFetchingServiceName = 'IFileFetchingService';

export interface IFileFetchingService {
  fetchFiles(filePath: string): FilesToAlign;
}
