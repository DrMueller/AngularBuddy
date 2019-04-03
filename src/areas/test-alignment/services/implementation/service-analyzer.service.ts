import { inject, injectable } from 'inversify';
import * as ts from 'typescript';

import { ISourceFileFactory, SourceFileFactoryName } from '../../../../infrastructure/ts-api/services';
import { ServiceAnalysis } from '../../models';
import { IServiceAnalyzerService } from '../service-analyzer-service.interface';

@injectable()
export class ServiceAnalyzerService implements IServiceAnalyzerService {

  public constructor(@inject(SourceFileFactoryName) private sourceFileFactory: ISourceFileFactory) {
  }

  public async analyseServiceAsync(filePath: string): Promise<ServiceAnalysis> {
    const sourceFile = await this.sourceFileFactory.createFromFilePathAsync(filePath);
    const injectedServiceNames = this.getInjectedServiceNames(sourceFile);

    return new ServiceAnalysis(injectedServiceNames);
  }

  private getInjectedServiceNames(sourceFile: ts.SourceFile): string[] {

    let serviceNames: string[] = [];

    sourceFile.forEachChild(f => {
      if (f.kind === ts.SyntaxKind.ClassDeclaration) {
        const classDecl = <ts.ClassDeclaration>f;
        const constructorNode = <ts.ConstructorDeclaration>classDecl.members.find(mmem => mmem.kind === ts.SyntaxKind.Constructor);
        if (constructorNode) {
          // const program = ts.createProgram([sourceFile.fileName], {});
          // const sample = program.getSourceFile('sample.ts');
          // const checker = program.getTypeChecker();
          // const tt2 = param.type;
          // debugger;
          // const tt1 = checker.getSymbolAtLocation(param);
          // debugger;

          serviceNames = constructorNode.parameters.map(p => p.type!.getText());
          debugger;
        }
      }
    });

    debugger;
    return serviceNames;
  }
}
