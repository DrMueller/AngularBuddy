import { Func } from '@drmueller/language-extensions';
import * as vscode from 'vscode';

export class ErrorHandlerService {
  public static async handledActionAsync(callback: Func<Promise<void>>): Promise<void> {
    try {
      await callback();
    } catch (err) {
      vscode.window.showErrorMessage(err.message);
    }
  }
}
