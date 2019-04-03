import { inject, injectable } from 'inversify';
import * as ts from 'typescript';

import { ISourceFileFactory, SourceFileFactoryName } from '../../../../infrastructure/ts-api/services';
import { SpecFile } from '../../models';
import { ISpecFileRepository } from '../spec-file-repository.interface';

@injectable()
export class SpecFileRepository implements ISpecFileRepository {

  public constructor(
    @inject(SourceFileFactoryName) private sourceFileFactory: ISourceFileFactory) {
  }

  public async loadSpecFileAsync(filePath: string): Promise<SpecFile> {
    const sourceFile = await this.sourceFileFactory.createFromFilePathAsync(filePath);
    const injectedServiceNames = await this.getInjectedServiceNamesAsync(sourceFile);

    return new SpecFile(filePath, injectedServiceNames);

    // const propertiesExceptProviders = expressionArg.properties.filter(f => !f.name || f.name.getText() !== 'providers');
    // expressionArg.properties = ts.createNodeArray(propertiesExceptProviders);

    // if (fs.existsSync(sourceFile.fileName)) {
    //   fs.unlinkSync(sourceFile.fileName);
    // }

    // const printer = ts.createPrinter();
    // const sourceFileText = printer.printFile(sourceFile);
    // fs.writeFileSync(sourceFile.fileName, sourceFileText);
  }

  public async saveNewlyAddedServiceMocks(specFile: SpecFile): Promise<void> {
    const sourceFile = await this.sourceFileFactory.createFromFilePathAsync(specFile.filePath);
    const props = await this.getProvidersInitializerAsync(sourceFile);
    const newArr = props.elements.map(ele => ele);

  }


  private async getFeatureDescribeBlockAsync(sourceFile: ts.SourceFile): Promise<ts.CallExpression | null> {

    let firstDescribeNode: ts.Node | null = null;

    sourceFile.forEachChild(child => {
      const describeNode = child.getText().startsWith('describe');
      if (describeNode && !firstDescribeNode) {
        firstDescribeNode = child.getChildAt(0); // Not sure why, but we want the child of the actual Node
      }
    });

    return firstDescribeNode;
  }

  private async getInjectedServiceNamesAsync(sourceFile: ts.SourceFile): Promise<string[]> {
    const props = await this.getProvidersInitializerAsync(sourceFile);

    const injetedServiceNames = props.elements.map(f => {
      const tra = f.getText();
      if (ts.isCallExpression(f)) {
        const cp = <ts.CallExpression>f;
        // ProvideMock
        if (cp.arguments.length === 1) {
          debugger;

          return cp.arguments[0].getText();
        } else {
          debugger;
          return '';
        }
      } else if (ts.isToken(f)) {
        // Direct injection
        return f.getText();
      } else {
        debugger;
        return '';
      }
    });

    return injetedServiceNames;
  }

  private async getProvidersInitializerAsync(sourceFile: ts.SourceFile): Promise<ts.ArrayLiteralExpression> {

    const featureDescribeNode = await this.getFeatureDescribeBlockAsync(sourceFile);

    if (!featureDescribeNode) {
      throw new Error('No Describe node found');
    }

    // SPOILER: This codeblock is like the sun - Don't look directly at it!
    const featureExpressionArg = featureDescribeNode.arguments[1];
    const body1 = <ts.Block>featureExpressionArg.getChildAt(4);
    const beforeEachStatement = <ts.ExpressionStatement>body1.statements[0];
    const expr = <ts.CallExpression>beforeEachStatement.expression;
    const configExpression = <ts.ArrowFunction>expr.arguments[0];
    const body2 = configExpression.body;
    const testBedConfigurExpression = <ts.ExpressionStatement>body2.getChildAt(1);
    const callbackArg = <ts.ExpressionStatement>testBedConfigurExpression.getChildAt(0);
    const expr2 = <ts.CallExpression>callbackArg.expression;
    const expressionArg = <ts.ObjectLiteralExpression>expr2.arguments[0];

    const providerPropertyAssignment = <ts.PropertyAssignment>expressionArg
      .properties.find(f => {
        if (!f.name) {
          return false;
        }

        return f.name.getText() === 'providers';
      });

    const props = <ts.ArrayLiteralExpression>providerPropertyAssignment.initializer;
    return props;
  }
}

