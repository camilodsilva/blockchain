import Block, { BlockData } from "./Block";

export default class BlockChain {
  private _blocks: Block[];
  private _index: number;

  constructor(readonly difficulty = 1) {
    this.difficulty = difficulty;
    this._blocks = [new Block()];
    this._index = 1;
  }

  public addBlock(data: BlockData): void {
    const index = this._index;
    const difficulty = this.difficulty;
    const previousHash = this.getLastBlock().hash;

    const block = new Block(index, previousHash, data, difficulty);

    this._index++;
    this._blocks.push(block);
  }

  private getLastBlock(): Block {
    return this._blocks[this._blocks.length - 1];
  }

  public isValid(): boolean {
    for (let i = 1; i < this._blocks.length; i++) {
      const currentBlock = this._blocks[i];
      const previousBlock = this._blocks[i - 1];

      if (currentBlock.hash !== currentBlock.generateHash()) {
        return false;
      }

      if (currentBlock.index !== previousBlock.index + 1) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }

  public getBlock(index: number): Block | undefined {
    return this._blocks.find((it) => it.index === index);
  }
}
