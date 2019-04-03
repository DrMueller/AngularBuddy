import { ServiceAnalysis } from '../models';

export const ServiceAnalyzerServiceName = 'IServiceAnalyzerService';

export interface IServiceAnalyzerService {
  analyseServiceAsync(filePath: string): Promise<ServiceAnalysis>;
}
