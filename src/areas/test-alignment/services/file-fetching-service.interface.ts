import { FilesToAlign } from '../models';

export const FileFetchingServiceName = 'IFileFetchingService';

export interface IFileFetchingService {
  fetchFilesAsync(filePath: string): Promise<FilesToAlign>;
}
