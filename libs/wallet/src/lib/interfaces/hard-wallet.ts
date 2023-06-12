import { ITransaction } from "@p2padv/transactions-base";

/**
 * @interface
 * Interface for hardware wallet objects, which are used for managing cryptographic keys and signing transactions securely.
 */
export interface IHardwareWallet {
  /**
   * @property
   * Public key of the hardware wallet.
   */
  publicKey: string;

  /**
   * @method
   * Signs a transaction with the hardware wallet's private key.
   * @param {ITransaction} transaction - The transaction to sign.
   * @returns {ITransaction} - The signed transaction.
   */
  signTransaction(transaction: ITransaction): ITransaction;
}