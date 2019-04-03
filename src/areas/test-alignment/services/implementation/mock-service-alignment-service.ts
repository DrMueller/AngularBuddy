import { inject, injectable } from 'inversify';

import { IServiceAnalyzerService, ServiceAnalyzerServiceName } from '..';
import { FileFetchingServiceName, IFileFetchingService } from '../file-fetching-service.interface';
import { IMockServiceAlignmentService } from '../mock-service-alignment-service.interface';
import { ISpecFileRepository, SpecFileRepositoryName } from '../spec-file-repository.interface';

@injectable()
export class MockServiceAlignmentService implements IMockServiceAlignmentService {
  public constructor(
    @inject(FileFetchingServiceName) private fileFetchingService: IFileFetchingService,
    @inject(ServiceAnalyzerServiceName) private serviceAnalyzer: IServiceAnalyzerService,
    @inject(SpecFileRepositoryName) private specFileRepo: ISpecFileRepository) {
  }

  public async alignMockServicesAsync(filePath: string): Promise<void> {
    const files = this.fileFetchingService.fetchFiles(filePath);

    const serviceAnalysis = await this.serviceAnalyzer.analyseServiceAsync(files.serviceFilePath);
    const specFile = await this.specFileRepo.loadSpecFileAsync(files.specFilePath);
    const specServicesLower = specFile.injectedServiceNames.map(f => f.toLowerCase());
    const serviceInjectionsLower = serviceAnalysis.injectedServiceNames.map(f => f.toLowerCase());
    const notInjectedServicesInSpec = serviceInjectionsLower.filter(serviceName => specServicesLower.indexOf(serviceName) === -1);

    notInjectedServicesInSpec.forEach(s => specFile.addServiceToMock(s));
    this.specFileRepo.saveNewlyAddedServiceMocks(specFile);
  }
}
