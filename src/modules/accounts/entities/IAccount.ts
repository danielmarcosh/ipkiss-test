interface IAccount {
  id?: string;
  balance?: number;
}
interface IRequestAccount {
  type: string;
  destination: string;
  origin: string;
  amount: number;
}
interface IRequestCreateAccount {
  destination: string;
  amount: number;
}
interface IRequestDepositAccount {
  account: IAccount;
  amount: number;
}
interface IRequestWithdrawAccount {
  account: IAccount;
  amount: number;
}
interface IRequestTransferAccount {
  accountOrigin: IAccount;
  accountDestination: IAccount;
  amount: number;
}
export {
  IAccount,
  IRequestAccount,
  IRequestCreateAccount,
  IRequestDepositAccount,
  IRequestWithdrawAccount,
  IRequestTransferAccount,
};
