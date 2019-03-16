import * as fs from 'fs';
import { inject, injectable } from 'inversify';
import * as ts from 'typescript';
import * as vscode from 'vscode';

import {
  IInformationService, InformationServiceName
} from '../../../../infrastructure/vscode/services';
import { IMockServiceAlignmentService } from '../mock-service-alignment-service.interface';

@injectable()
export class MockServiceAlignmentService implements IMockServiceAlignmentService {

  public constructor(@inject(InformationServiceName) private infoService: IInformationService) { }

  public async alignMockServicesAsync(filePath: string): Promise<void> {
    const document = await vscode.workspace.openTextDocument(filePath);
    const sourceFile = ts.createSourceFile(document.fileName, document.getText(), ts.ScriptTarget.Latest, true);
    const featureDescribeNode = await this.getFeatureDescribeBlockAsync(sourceFile);

    if (!featureDescribeNode) {
      this.infoService.showError('No Feature fescribe node found in file');
      return;
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

    const propertiesExceptProviders = expressionArg.properties.filter(f => !f.name || f.name.getText() !== 'providers');
    expressionArg.properties = ts.createNodeArray(propertiesExceptProviders);

    if (fs.existsSync(sourceFile.fileName)) {
      fs.unlinkSync(sourceFile.fileName);
    }

    const printer = ts.createPrinter();
    const sourceFileText = printer.printFile(sourceFile);
    fs.writeFileSync(sourceFile.fileName, sourceFileText);

    debugger;

  }

  private async getFeatureDescribeBlockAsync(sourceFile: ts.SourceFile): Promise<ts.CallExpression | null> {

    let firstDescribeNode: ts.Node | null = null;

    sourceFile.forEachChild(child => {
      const describeNode = child.getText().startsWith('describe');
      if (describeNode && !firstDescribeNode) {
        firstDescribeNode = child.getChildAt(0); // Not sure why, but we want the child of the acutal Node
      }
    });

    return firstDescribeNode;
  }
}
