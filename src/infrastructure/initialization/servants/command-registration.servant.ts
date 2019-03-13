import * as vscode from 'vscode';

import { ServiceLocatorService } from '../../dependency-injection';
import { ErrorHandlerService } from '../../error-handling/services';

export class CommandRegistrationServant {
  public static registerCommands(context: vscode.ExtensionContext): void {
    CommandRegistrationServant.registerAlignAllBarrels(context);
  }


  private static registerAlignAllBarrels(context: vscode.ExtensionContext): void {
    const arrangeFileCommand = vscode.commands.registerCommand('extension.alignTestServiceMocks', async (contextData: any) => {
      ErrorHandlerService.handledActionAsync(async () => {
        if (!contextData) {
          return;
        }

        const selectedPath = contextData.fsPath;
      });
    });

    context.subscriptions.push(arrangeFileCommand);
  }
}
