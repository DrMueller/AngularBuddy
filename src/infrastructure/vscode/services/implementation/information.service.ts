import { injectable } from 'inversify';
import * as vscode from 'vscode';

import { IInformationService } from '../information-service.interface';

@injectable()
export class InformationService implements IInformationService {
  public debugMessage(message: string): void {
    console.log(message);
  }

  public showInfo(message: string): void {
    vscode.window.showInformationMessage(message);
  }

  public showError(message: string): void {
    vscode.window.showErrorMessage(message);
  }
}
