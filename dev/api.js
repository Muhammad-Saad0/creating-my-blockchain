import express from "express";
import bodyParser from "body-parser";
import { Blockchain } from "./blockchain.js";

var app = express();
const bitcoin = new Blockchain();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({ extended: false })
);

app.get("/blockchain", (req, res) => {
  res.send(bitcoin);
});

app.post("/transaction", (req, res) => {
  const data = req.body;
  const blockIndex = bitcoin.createNewTransaction(
    data.amount,
    data.sender,
    data.recipient
  );
  res.json(
    `Transaction will be added in block: ${blockIndex}`
  );
});

app.get("/mine", (req, res) => {
  const lastBlock = bitcoin.getLastBlock();
  const prevBlockHash = lastBlock.hash;

  const currentBlockData = {
    transactions: bitcoin.pendingTransactions,
  };

  const nonce = bitcoin.proofOfWork(
    prevBlockHash,
    currentBlockData
  );

  const hash = bitcoin.hashBlock(
    prevBlockHash,
    currentBlockData,
    nonce
  );

  const newBlock = bitcoin.createNewBlock(
    nonce,
    prevBlockHash,
    hash
  );

  res.json(newBlock);
});

app.listen(3000, () => {
  console.log("listening on port: 3000...");
});
