import { Blockchain } from "./blockchain.js";

const bitcoin = new Blockchain();
const previousBlockHash =
  "DFJKDSHA5HJK34534HFSDJ";
const currentBlockData = [
  {
    amount: 10,
    sender: "Kenny",
    recipient: "jenn",
  },
];

console.log(bitcoin);
