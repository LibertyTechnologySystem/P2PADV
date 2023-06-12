import { ITransaction } from "@p2padv/transactions-base";
import { IToken, INFT } from "@p2padv/core";
import { IHardwareWallet } from "./hard-wallet";

/**
 * @interface
 * Interface for wallet objects, which are used for managing cryptographic keys, signing transactions, and storing tokens and NFTs.
 */
export interface IWallet {
  /**
   * @property
   * Private key of the wallet.
   */
  privateKey: string;

  /**
   * @property
   * Public key of the wallet.
   */
  publicKey: string;

  /**
   * @property
   * Array of tokens owned by the wallet.
   */
  tokens: IToken[];

  /**
   * @property
   * Array of NFTs owned by the wallet.
   */
  nfts: INFT[];

  /**
   * @method
   * Signs a transaction with the wallet's private key.
   * @param {ITransaction} transaction - The transaction to sign.
   * @returns {ITransaction} - The signed transaction.
   */
  signTransaction(transaction: ITransaction): ITransaction;

  /**
   * @method
   * Generates a new address based on the wallet's public key.
   * @returns {string} - The new address.
   */
  generateAddress(): string;

  /**
   * @method
   * Imports a private key into the wallet.
   * @param {string} privateKey - The private key to import.
   */
  importPrivateKey(privateKey: string): void;

  /**
   * @method
   * Exports the wallet's private key.
   * @returns {string} - The private key of the wallet.
   */
  exportPrivateKey(): string;

  /**
   * @method
   * Creates a backup of the wallet data.
   * @returns {Promise<string>} - A Promise that resolves with the backup data as a string.
   */
  createBackup(): Promise<string>;

  /**
   * @method
   * Creates a backup of the wallet data and encrypts it with a password.
   * @param {string} password - The password to encrypt the backup data with.
   * @returns {Promise<string>} - A Promise that resolves with the encrypted backup data as a string.
   */
  createBackup(password: string): Promise<string>;

  /**
   * @method
   * Restores the wallet from backup data.
   * @param {string} backup - The backup data.
   */
  restoreFromBackup(backup: string): void;

  /**
   * @method
   * Restores the wallet from encrypted backup data.
   * @param {string} backup - The encrypted backup data.
   * @param {string} password - The password to decrypt the backup data with.
   */
  restoreFromBackup(backup: string, password: string): void;

  /**
   * @method
   * Connects a hardware wallet to the wallet.
   * @param {IHardwareWallet} hardwareWallet - The hardware wallet to connect.
   */
  connectHardwareWallet(hardwareWallet: IHardwareWallet): void;

  /**
   * @method
   * Disconnects the currently connected hardware wallet from the wallet.
   */
  disconnectHardwareWallet(): void;
}