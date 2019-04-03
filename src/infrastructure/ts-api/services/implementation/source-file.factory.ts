import { injectable } from 'inversify';
import * as ts from 'typescript';
import * as vscode from 'vscode';

import { ISourceFileFactory } from '../source-file-factory.interface';

@injectable()
export class SourceFileFactory implements ISourceFileFactory {
  public async createFromFilePathAsync(filePath: string): Promise<ts.SourceFile> {
    const document = await vscode.workspace.openTextDocument(filePath);
    const sourceFile = ts.createSourceFile(document.fileName, document.getText(), ts.ScriptTarget.Latest, true);
    return sourceFile;
  }
}
