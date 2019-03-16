import { Container } from 'inversify';
import 'reflect-metadata';

import {
    ConstructorAnalyzerServiceName, IConstructorAnalyzerService, IMockServiceAlignmentService,
    MockServiceAlignmentServiceName
} from '../../areas/test-alignment/services';
import {
    ConstructorAnalyzerService, MockServiceAlignmentService
} from '../../areas/test-alignment/services/implementation';
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
    container.bind<IMockServiceAlignmentService>(MockServiceAlignmentServiceName).to(MockServiceAlignmentService);
    container.bind<IConstructorAnalyzerService>(ConstructorAnalyzerServiceName).to(ConstructorAnalyzerService);

    // Infrastructure
    container.bind<IInformationService>(InformationServiceName).to(InformationService);
  }
}
