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
export { IAccount, IRequestAccount };
