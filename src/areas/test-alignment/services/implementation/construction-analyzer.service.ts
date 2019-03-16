import { injectable } from 'inversify';

import { IConstructorAnalyzerService } from '../construction-analyzer-service.interface';

@injectable()
export class ConstructorAnalyzerService implements IConstructorAnalyzerService {
  public getConstructorInjectedServices(): void {
  }
}
