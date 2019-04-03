import { SourceFile } from 'typescript';

export const SourceFileFactoryName = 'ISourceFileFactory';

export interface ISourceFileFactory {
  createFromFilePathAsync(filePath: string): Promise<SourceFile>;
}
