import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import React from "react";
import { Movie } from "../Model/Movie";
import {
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
export const TransactionDetail = () => {
  const MOVIE_REVIEW_PROGRAM_ID =
    "8w8MJd1q33Mhqjwiiznhu3AuMZGg75YpwvtVARutHm7W";

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const handleSubmit = async () => {
    const movie = new Movie("dfhsdhsfABfdsgg", 5, "osmdfgshry5ret");
    handleTransacttionSubmit(movie);
  };

  const handleTransacttionSubmit = async (movie: Movie) => {
    if (!publicKey) {
      return "please connect the wallet";
    }

    const buffer = movie.serialize();
    const transaction = new Transaction();

    const [pda] = await PublicKey.findProgramAddressSync(
      [publicKey.toBuffer(), new TextEncoder().encode(movie.title)],
      new PublicKey(MOVIE_REVIEW_PROGRAM_ID)
    );

    console.log(pda, "PDA");

    const instruction = new TransactionInstruction({
      keys: [
        {
          pubkey: publicKey,
          isSigner: true,
          isWritable: true,
        },
        {
          pubkey: pda,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: SystemProgram.programId,
          isSigner: false,
          isWritable: false,
        },
      ],
      data: buffer,
      programId: new PublicKey(MOVIE_REVIEW_PROGRAM_ID),
    });

    console.log(instruction, "instruction");
    transaction.add(instruction);
    const instructiondata = await sendTransaction(transaction, connection);
    console.log(instructiondata);
  };

  return (
    <>
      <button onClick={handleSubmit}> send</button>
    </>
  );
};
