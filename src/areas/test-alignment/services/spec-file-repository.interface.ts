import { SpecFile } from '../models/spec-file.model';

export const SpecFileRepositoryName = 'ISpecFileRepository';

export interface ISpecFileRepository {
  loadSpecFileAsync(filePath: string): Promise<SpecFile>;
  saveNewlyAddedServiceMocks(specFile: SpecFile): Promise<void>;
}
