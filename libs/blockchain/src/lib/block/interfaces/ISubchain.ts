import { IBlock } from "./IBlock";

export interface SubChainBlock extends IBlock {
	subChainId: string;
	parentChainId: string;
}