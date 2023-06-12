export interface IToken {
	id: string;
	balance(): number;
	totalSupply(): number;
	transfer(toAddress: string, amount: number): void;
	burn(amount: number): void;
	allowance(owner: string, spender: string): number;
	approve(spender: string, value: number): boolean;
	transferFrom(from: string, to: string, value: number): boolean;
}