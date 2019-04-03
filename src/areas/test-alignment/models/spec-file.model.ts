
export class SpecFile {
  public constructor(
    public readonly filePath: string,
    public readonly injectedServiceNames: string[]) {
  }

  public addServiceToMock(serviceName: string): void {
    this.injectedServiceNames.push(serviceName);
  }
}
