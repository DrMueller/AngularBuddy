export const InformationServiceName = 'IInformationService';

export interface IInformationService {
  debugMessage(message: string): void;

  showInfo(message: string): void;

  showError(message: string): void;
}
