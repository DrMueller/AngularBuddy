import { injectable } from 'inversify';

import { FilesToAlign } from '../../models';
import { IFileFetchingService } from '../file-fetching-service.interface';

@injectable()
export class FileFetchingService implements IFileFetchingService {
  public fetchFiles(filePath: string): FilesToAlign {
    if (filePath.endsWith('spec.ts')) {
      const serviceFilePath = filePath.replace('.spec.', '.');
      return new FilesToAlign(serviceFilePath, filePath);
    }

    const specFilePath = filePath.replace('.ts', '.spec.ts');
    return new FilesToAlign(filePath, specFilePath);
  }
}
