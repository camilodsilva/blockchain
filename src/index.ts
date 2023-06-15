import Block from "./Block";
import BlockChain from "./BlockChain";

const blockChain = new BlockChain(3);
blockChain.addBlock({ amount: 4, statement: "first" });
blockChain.addBlock({ amount: 50, statement: "second" });

console.log(blockChain.isValid());
blockChain.getBlock(2)!.data.amount = 50;
console.log(blockChain.isValid());
