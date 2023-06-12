export interface ITransaction {
	fromAddress: string;
	toAddress: string;
	amount: number;
	signature: string;
	fee: number;
	validateTransaction(): boolean;
}