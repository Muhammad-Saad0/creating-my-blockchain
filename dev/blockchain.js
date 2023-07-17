import sha256 from "sha256";

export function Blockchain() {
  this.chain = [];
  //pendingTransactions MEANS THE TRANSACTIONS THAT ARE PENDING AND ARE NOT
  //PLACED INSIDE A BLOCK YET
  this.pendingTransactions = [];
  //CREATING A GENESIS(first block of chain) BLOCK WITH ARBITRARY VALUES
  this.createNewBlock(100, "0", "0");
}
Blockchain.prototype.createNewBlock = function (
  nonce,
  previousBlockHash,
  hash
) {
  const newBlock = {
    index: this.chain.length + 1,
    timestamp: Date.now(),
    transactions: this.pendingTransactions,
    nonce: nonce,
    hash: hash,
    previousBlockHash: previousBlockHash,
  };
  //WE ARE EMPTYING THE TRANSACTIONS OF BLOCKCHAIN
  //AS WE PLACED THEM INTO THE BLOCK
  this.pendingTransactions = [];
  this.chain.push(newBlock);

  return newBlock;
};

Blockchain.prototype.getLastBlock = function () {
  return this.chain[this.chain.length - 1];
};

Blockchain.prototype.createNewTransaction =
  function (amount, sender, recipient) {
    const newTransaction = {
      amount: amount,
      sender: sender,
      recipient: recipient,
    };

    this.pendingTransactions.push(newTransaction);
    //THIS RETURNS THE NUMBER OF BLOCK THAT OUT NEW TRANSACTION
    //HAS BEEN PUSHED INTO
    return this.getLastBlock()["index"] + 1;
  };

Blockchain.prototype.hashBlock = function (
  previousBlockHash,
  currentBlockData,
  nonce
) {
  const dataAsString =
    previousBlockHash +
    nonce.toString() +
    JSON.stringify(currentBlockData);

  const hash = sha256(dataAsString);
  return hash;
};

Blockchain.prototype.proofOfWork = function (
  previousBlockHash,
  currentBlockData
) {
  let nonce = 0;
  let hash = this.hashBlock(
    previousBlockHash,
    currentBlockData,
    nonce
  );
  while (hash.substring(0, 4) !== "0000") {
    nonce++;
    hash = this.hashBlock(
      previousBlockHash,
      currentBlockData,
      nonce
    );
  }
  return nonce;
};
