import { Container } from 'inversify';
import 'reflect-metadata';

import {
    FileFetchingServiceName,
    IFileFetchingService,
    IMockServiceAlignmentService,
    IServiceAnalyzerService,
    ISpecFileRepository,
    MockServiceAlignmentServiceName,
    ServiceAnalyzerServiceName,
    SpecFileRepositoryName
} from '../../areas/test-alignment/services';
import {
    MockServiceAlignmentService, SpecFileRepository
} from '../../areas/test-alignment/services/implementation';
import { FileFetchingService } from '../../areas/test-alignment/services/implementation/file-fetching.service';
import { ServiceAnalyzerService } from '../../areas/test-alignment/services/implementation/service-analyzer.service';
import { ISourceFileFactory, SourceFileFactoryName } from '../ts-api/services';
import { SourceFileFactory } from '../ts-api/services/implementation/source-file.factory';
import { IInformationService, InformationServiceName } from '../vscode/services';
import { InformationService } from '../vscode/services/implementation';

import { ServiceLocatorService } from './';

export class DependencyInjectionInitializationService {
  public static initialize(): void {
    const container = new Container();
    this.bindMappings(container);
    ServiceLocatorService.initialize(container);
  }

  private static bindMappings(container: Container): void {
    // Areas
    container.bind<IFileFetchingService>(FileFetchingServiceName).to(FileFetchingService);
    container.bind<IMockServiceAlignmentService>(MockServiceAlignmentServiceName).to(MockServiceAlignmentService);
    container.bind<IServiceAnalyzerService>(ServiceAnalyzerServiceName).to(ServiceAnalyzerService);
    container.bind<ISpecFileRepository>(SpecFileRepositoryName).to(SpecFileRepository);

    // Infrastructure
    container.bind<IInformationService>(InformationServiceName).to(InformationService);
    container.bind<ISourceFileFactory>(SourceFileFactoryName).to(SourceFileFactory);
  }
}
