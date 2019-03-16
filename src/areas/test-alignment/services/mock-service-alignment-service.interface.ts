export const MockServiceAlignmentServiceName = 'IMockServiceAlignmentService';

export interface IMockServiceAlignmentService {
  alignMockServicesAsync(filePath: string): Promise<void>;
}
