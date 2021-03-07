export class Account {
  constructor(
    public accountId: number,
    public premiseStateCd: string,
    public testOrControlIndicator: string,
    public partBeginDate: Date,
  ) {}
}
