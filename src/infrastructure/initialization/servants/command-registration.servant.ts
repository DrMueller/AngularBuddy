import * as vscode from 'vscode';

import { IMockServiceAlignmentService, MockServiceAlignmentServiceName } from '../../../areas/test-alignment/services';
import { ServiceLocatorService } from '../../dependency-injection';
import { ErrorHandlerService } from '../../error-handling/services';

export class CommandRegistrationServant {
  public static registerCommands(context: vscode.ExtensionContext): void {
    CommandRegistrationServant.registerAlignTestServiceMocks(context);
  }

  private static registerAlignTestServiceMocks(context: vscode.ExtensionContext): void {
    const arrangeFileCommand = vscode.commands.registerCommand('extension.alignTestServiceMocks', async (contextData: any) => {
      ErrorHandlerService.handledActionAsync(async () => {

        if (!contextData) {
          return;
        }

        const mockAlignmentService = ServiceLocatorService.resolveService<IMockServiceAlignmentService>(MockServiceAlignmentServiceName);
        await mockAlignmentService.alignMockServicesAsync(contextData.fsPath);
      });
    });

    context.subscriptions.push(arrangeFileCommand);
  }
}
