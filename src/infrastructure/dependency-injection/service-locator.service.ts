import { Container } from 'inversify';

export class ServiceLocatorService {
  private static _container: Container;

  public static resolveService<T>(serviceIdentifier: string): T {
    const result = this._container.get<T>(serviceIdentifier);

    return result;
  }

  public static initialize(container: Container): void {
    this._container = container;
  }
}
