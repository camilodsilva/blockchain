import sha256 from "crypto-js/sha256";

export type BlockData = {
  amount: number;
  statement: string;
};

export default class Block {
  private _timestamp: Date;
  private _hash: string;
  private _nonce: number;

  constructor(
    readonly index: number = 0,
    readonly previousHash: string | null = null,
    readonly data: BlockData = { amount: 0, statement: "Genesis block" },
    readonly difficulty: number = 1
  ) {
    this.index = index;
    this.previousHash = previousHash;
    this.data = data;
    this.difficulty = difficulty;
    this._timestamp = new Date();
    this._nonce = 0;
    this._hash = this.generateHash();

    this.mine();
  }

  public generateHash(): string {
    return sha256(
      this.index +
        this.previousHash! +
        JSON.stringify(this.data) +
        this._timestamp +
        this._nonce
    ).toString();
  }

  private mine(): void {
    while (!/^0*$/.test(this._hash.substring(0, this.difficulty))) {
      this._nonce++;
      this._hash = this.generateHash();
    }
  }

  public get hash(): string {
    return this._hash;
  }
}
