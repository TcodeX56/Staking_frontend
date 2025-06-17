import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { TRX } from "../Model/Trx";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
export const SolTransfer = () => {
  const [formdata, setformdata] = useState({
    amount: "",
  });

  const PROGRAM_ID = "5kGYbmXpAjPvK7NuAjp7x31ZMfGYvgkroEE6Cp2b6bV7";
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const hadlesolTransaction = async () => {
    const data = new TRX(1 * LAMPORTS_PER_SOL);
    if (!publicKey) {
      return;
    }

    const transaction = new Transaction();

    const trxData = data.serialize();
    console.log(trxData);

    const instruction = new TransactionInstruction({
      keys: [
        {
          pubkey: publicKey,
          isSigner: true,
          isWritable: true,
        },
        {
          pubkey: new PublicKey("AjjGPZGfyFHbr4kPexWKmGZEEaMDFq2Lf5dEvRGXBfAq"),
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: SystemProgram.programId,
          isSigner: false,
          isWritable: false,
        },
      ],
      data: trxData,
      programId: new PublicKey(PROGRAM_ID),
    });

    transaction.add(instruction);

    const signature = await sendTransaction(transaction, connection);
    console.log(signature);
    await connection.confirmTransaction(signature);
    console.log(signature);
  };

  const hadleManualTransaction = async () => {
    const data = new TRX(1);
    if (!publicKey) {
      return;
    }

    const transaction = new Transaction();

    const trxData = data.manuallySerialize();
    console.log(trxData);

    const instruction = new TransactionInstruction({
      programId: new PublicKey("5kGYbmXpAjPvK7NuAjp7x31ZMfGYvgkroEE6Cp2b6bV7"),
      keys: [
        {
          pubkey: publicKey,
          isSigner: true,
          isWritable: true,
        },
        {
          pubkey: new PublicKey("v8GyYc8pUku6hQsR5hE4Gm8svFU1H9BqSvo8CbsVwVa"),
          isSigner: false,
          isWritable: true,
        }
      ],
      data: trxData,
    });

    transaction.add(instruction);

    const signature = await sendTransaction(transaction, connection);
    console.log(signature);
    await connection.confirmTransaction(signature);
    console.log(signature);
  };

  return (
    <>
      <div className="container mt-4">
        <div className="rows">
          <div className="col-sm-6 mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Name
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter Name "
              onChange={(e) =>
                setformdata({
                  ...formdata,
                  amount: e.target.value,
                })
              }
            />
          </div>
          <div className="col-sm-3 m-1">
            <button className="btn btn-primary" onClick={hadlesolTransaction}>
              transaction{" "}
            </button>
          </div>
          <div className="col-sm-3 m-1">
            <button
              className="btn btn-primary"
              onClick={hadleManualTransaction}
            >
              manually{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
