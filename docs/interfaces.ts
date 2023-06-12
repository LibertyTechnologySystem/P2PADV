import { createSign, createVerify, scrypt } from 'crypto';
import { createHash } from 'crypto';
import { ec as EC } from 'elliptic';
import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'crypto';


export interface IBlock {
	index: number;
	timestamp: number;
	transactions: ITransaction[];
	nonce: number;
	miner: string;
	validator: string;
	previousHash: string;
	hash: string;
	forkLength: number;
	penalties: IPenalty[];
	votes: IVote[];
}

export interface ITransaction {
	fromAddress: string;
	toAddress: string;
	amount: number;
	signature: string;
	fee: number;
	validateTransaction(): boolean;
}

export interface ITokenTransaction extends ITransaction {
	token: IToken;
}

export interface INftTransaction extends ITransaction {
	nft: INFT;
}

export interface IMintTransaction extends ITransaction {
	token: IToken;
}

export interface IMintNftTransaction extends ITransaction {
	nft: INFT;
}

export interface IBlockchain {
	chain: IBlock[];
	difficulty: number;
	reward: number;
	transactionPool: ITransaction[];
	createTransaction(transaction: ITransaction): void;
	addBlock(block: IBlock): void;
	isValidChain(): boolean;
	resolveForks(): void;
	validateTransactions(transactions: ITransaction[]): boolean;
}

export interface IWallet {
	privateKey: string;
	publicKey: string;
	tokens: IToken[];  // Tokens owned
	nfts: INFT[];  // NFTs owned
	signTransaction(transaction: ITransaction): ITransaction;
	generateAddress(): string;  // Generate a new address
	importPrivateKey(privateKey: string): void;  // Import a private key
	exportPrivateKey(): string;  // Export private key
	createBackup(): Promise<string>;  // Create a backup of the wallet
	createBackup(passowrd: string): Promise<string>;  // Create a backup of the wallet
	restoreFromBackup(backup: string): void;
	restoreFromBackup(backup: string, password: string): void;
	connectHardwareWallet(hardwareWallet: IHardwareWallet): void;  // Connect a hardware wallet
	disconnectHardwareWallet(): void;  // Disconnect the hardware wallet
}

export interface IHardwareWallet {
	publicKey: string;
	signTransaction(transaction: ITransaction): ITransaction;
}

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

export interface INFT {
	id: string;
	metadata: any;
	transfer(toAddress: string): void;
	ownerOf(tokenId: string): string;
	balanceOf(owner: string): number;
	approve(to: string, tokenId: string): void;
	getApproved(tokenId: string): string;
	setApprovalForAll(to: string, approved: boolean): void;
	isApprovedForAll(owner: string, operator: string): boolean;
	transferFrom(from: string, to: string, tokenId: string): void;
	safeTransferFrom(from: string, to: string, tokenId: string, data: string): void;
}

export interface ISmartContract {
	id: string;
	code: string;
	execute(transaction: ITransaction): void;
	deploy(): void;
	invokeFunction(functionName: string, params: any[]): any;
	handleEvent(event: IContractEvent): void;
}

export interface IBridgeOperation {
	sourceBlockchain: IBlockchain;
	destinationBlockchain: IBlockchain;
	executeBridgeOperation(data: any): void;
}

export interface IShard {
	id: string;
	blockchain: IBlockchain;
}

export interface IShardingManager {
	shards: IShard[];
	addShard(shard: IShard): void;
	removeShard(shardId: string): void;
}

export interface IValidator {
	address: string;
	stakedAmount: number; // changed from 'stake' to 'stakedAmount' to avoid naming conflict
	claimReward(): void; // handle rewards claiming
	addToStake(amount: number): void; // changed from 'stake' to 'addToStake'
	removeFromStake(amount: number): void; // changed from 'unstake' to 'removeFromStake'
	proposeBlock(transactions: ITransaction[]): IBlock;
	voteOnPenalty(address: string, vote: boolean): void;
	checkMinerPower(miner: IMiner): boolean;
}

export interface IMiner {
	address: string;
	computePower: number;
	validateBlock(block: IBlock): boolean;
	checkValidatorStake(validator: IValidator): boolean;
}

export interface ISubchain {
	id: string;
	parentChain: IBlockchain;
	backupFrequency: number;
	gasFee: number; // gas fee handling
	backup(): void;
	setGasFee(fee: number): void; // set gas fee
}

export interface ICommunication {
	sendTransaction(transaction: ITransaction): void;
	broadcastBlock(block: IBlock): void;
	sendMessage(peer: IPeer, message: string): void;
	broadcastMessage(network: INetwork, message: string): void;
}

export interface ISynchronization {
	syncBlockchain(blockchain: IBlockchain): void;
}

export interface IPenaltyManager {
	penalize(address: string, penalty: number): void;
	detectAndPenalizeSybilAttack(nodeId: string): void;
}

export interface IVotingManager {
	startVote(topic: string, options: string[]): void;
	castVote(address: string, vote: string): void;
	executeDecision(decision: string): void;
}

export interface IStorage {
	read(key: string): any;
	write(key: string, value: any): void;
}

export interface IState {
	storage: IStorage;
	get(key: string): any;
	set(key: string, value: any): void;
}

// add Event interfaces
export interface IContractEvent {
	name: string;
	data: any;
}

export interface IEventLog {
	events: IContractEvent[];
	addEvent(event: IContractEvent): void;
	getEvents(): IContractEvent[];
}


export interface IGasManager {
	calculateGas(transaction: ITransaction): number;
}

export interface ITransactionPool {
	addTransaction(transaction: ITransaction): void;
	getTransactions(): ITransaction[];
	removeTransaction(transaction: ITransaction): void;
}

export interface IBlockchainError {
	code: number;
	message: string;
}

export interface IEncryption {
	secureCommunication(peer: IPeer, data: string): string;
}
export interface IPenalty {
	// New interface to handle penalties
	address: string;
	penaltyAmount: number;
}

export interface IVote {
	// New interface to handle votes
	address: string;
	vote: boolean;
}

export interface IBackupAlert {
	// New interface for system that monitors and alerts for missed backups
	subchainId: string;
	alert(): void;
}

export interface IPeer {
	id: string;
	address: string;
	communication: ICommunication;
}

export interface INetwork {
	peers: IPeer[];
	addPeer(peer: IPeer): void;
	removePeer(peerId: string): void;
}

export interface INode {
	id: string;
	blockchain: IBlockchain
	wallet: IWallet
	network: INetwork
	communication: ICommunication
	backupAlert: IBackupAlert;
	synchronize(): void
	receiveMessage(message: string): void

}


// Using secp256k1 curve
const ec = new EC('secp256k1');

const defaultPassword = "LTS-p2padv";
export class Wallet implements IWallet {
	private _keyPair = ec.genKeyPair();
	public tokens: IToken[] = [];
	public nfts: INFT[] = [];

	get publicKey() {
		return this._keyPair.getPublic('hex');
	}

	get privateKey() {
		return this._keyPair.getPrivate('hex');
	}

	constructor() {
		this._keyPair = this.generateKeyPair();
	}

	private generateKeyPair() {
		return ec.genKeyPair();
	}

	signTransaction(transaction: ITransaction): ITransaction {
		if (transaction.fromAddress !== this.publicKey) {
			throw new Error('Cannot sign transactions for other wallets!');
		}
		const hash = this.getHash(JSON.stringify(transaction));
		const signature = this._keyPair.sign(hash, 'base64');
		transaction.signature = signature.toDER('hex');
		return transaction;
	}

	private getHash(data: string): string {
		return createHash('sha256').update(data).digest('hex');
	}

	generateAddress(): string {
		const keyPair = this.generateKeyPair();
		return keyPair.getPublic('hex');
	}

	importPrivateKey(privateKey: string): void {
		this._keyPair = ec.keyFromPrivate(privateKey);
	}

	exportPrivateKey(): string {
		return this.privateKey;
	}

	async createBackup(password: string = defaultPassword): Promise<string> {
		const salt = randomBytes(16); // Generate a new salt for each backup
		const key = await this.getEncryptionKey(password, salt);

		const iv = randomBytes(16); // Initialization vector
		const cipher = createCipheriv('aes-256-cbc', key, iv);

		const data = {
			privateKey: this.privateKey,
			tokens: this.tokens,
			nfts: this.nfts
		};

		let encryptedData = cipher.update(JSON.stringify(data), 'utf8', 'hex');
		encryptedData += cipher.final('hex');

		// Include the salt and IV with the data
		return `${salt.toString('hex')}:${iv.toString('hex')}:${encryptedData}`;
	}

	async restoreFromBackup(backup: string, password: string = defaultPassword): Promise<void> {
		const [saltHex, ivHex, encryptedData] = backup.split(':');
		const salt = Buffer.from(saltHex, 'hex');
		const iv = Buffer.from(ivHex, 'hex');

		const key = await this.getEncryptionKey(password, salt);
		const decipher = createDecipheriv('aes-256-cbc', key, iv);

		let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
		decryptedData += decipher.final('utf8');

		const data = JSON.parse(decryptedData);

		this.importPrivateKey(data.privateKey);
		this.tokens = data.tokens;
		this.nfts = data.nfts;
	}

	private getEncryptionKey(password: string, salt: Buffer): Promise<Buffer> {
		return new Promise((resolve, reject) => {
			// Use scrypt to derive a key from the password and salt
			scrypt(password, salt, 32, (err, derivedKey) => {
				if (err) reject(err);
				else resolve(derivedKey);
			});
		});
	}

	connectHardwareWallet(hardwareWallet: IHardwareWallet): void {
		this._keyPair = ec.keyFromPublic(hardwareWallet.publicKey, 'hex');
	}

	disconnectHardwareWallet(): void {
		this._keyPair = this.generateKeyPair();
	}

	addToken(token: IToken): void {
		if (this.tokens.find(t => t.id === token.id)) {
			throw new Error(`Token ${token.id} already exists in wallet`);
		}
		this.tokens.push(token);
	}

	getBalance(tokenSymbol: string): number {
		const userToken = this.tokens.find(t => t.id === tokenSymbol);
		if (!userToken) {
			throw new Error(`Token ${tokenSymbol} not found in wallet`);
		}
		return userToken.balance();
	}
}