import { ITransaction } from "@p2padv/transactions-base";

export interface IBlock {
	index: number;
	timestamp: number;
	transactions: ITransaction[];
	nonce: number;
	miner: string;
	validator: string;
	previousHash: string;
	hash: string;
	height: number;
}
