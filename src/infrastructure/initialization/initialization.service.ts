import * as vscode from 'vscode';

import { DependencyInjectionInitializationService } from '../dependency-injection';

import { CommandRegistrationServant } from './servants';

export class InitializationService {
  public static initializeExtension(context: vscode.ExtensionContext): void {
    DependencyInjectionInitializationService.initialize();
    CommandRegistrationServant.registerCommands(context);
  }
}
