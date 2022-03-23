interface IAccount {
  id?: string;
  type: string;
  balance?: number;
}
interface IRequestAccount {
  type: string;
  destination: string;
  amount: number;
}
export { IAccount, IRequestAccount };
