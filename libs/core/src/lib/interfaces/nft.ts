export interface INFT {
	id: string;
	metadata: unknown;
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