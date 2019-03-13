import { Container } from 'inversify';
import 'reflect-metadata';

import { ServiceLocatorService } from '.';

export class DependencyInjectionInitializationService {
  public static initialize(): void {
    const container = new Container();
    this.bindMappings(container);
    ServiceLocatorService.initialize(container);
  }

  private static bindMappings(container: Container): void {
  }
}
