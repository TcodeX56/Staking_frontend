import { getMinimumBalanceForRentExemptMint } from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import BN from "bn.js";
import { useEffect, useState } from "react";

export const Counter = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [counterData, setCounterData] = useState<number>(0);

  const PROGRAMM_ID = new PublicKey(
    "9TgLFyZ5vRTQneR1L5QJxM4ndLaJadBzRNzYAdevw4BD"
  );
  const handleSubmit = async () => {
    if (!connection && !publicKey) {
      return console.log("please connect the wallet");
    }

    // const mint = Keypair.generate();

    // const mint = new PublicKey("Hn7wTfRGbsd75n31PLRL94LC6Z6wo2tqs5znpRkPtnMK");

    // console.log(mint.publicKey.toBase58());

    const [pda] =  PublicKey.findProgramAddressSync(
      [new TextEncoder().encode("global_counter")],
      PROGRAMM_ID
    );

    console.log(pda.toBase58());

    const Rent = await getMinimumBalanceForRentExemptMint(connection);

    const transaction = new Transaction();

    if (publicKey) {
      // const counter = SystemProgram.createAccount({
      //   fromPubkey: publicKey,
      //   newAccountPubkey: mint.publicKey,
      //   lamports: Rent,
      //   space: 8,
      //   programId: PROGRAMM_ID,
      // });

      const instruction = new TransactionInstruction({
        programId: PROGRAMM_ID,
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
        data: Buffer.from([0x0]),
      });

      transaction.add(instruction);

      const signature = await sendTransaction(transaction, connection, {
        // signers: [mint],
      });
      console.log(signature);
      await connection.confirmTransaction(signature);
      console.log(signature);
      getdata();
    }
  };

  const handleDecreament = async () => {
    if (!connection && !publicKey) {
      return console.log("please connect the wallet");
    }

    // const mint = Keypair.generate();

    const [pda] = await PublicKey.findProgramAddressSync(
      [new TextEncoder().encode("global_counter")],
      PROGRAMM_ID
    );

    console.log(pda.toBase58());

    // console.log(mint.publicKey.toBase58());
    const Rent = await getMinimumBalanceForRentExemptMint(connection);

    const transaction = new Transaction();

    if (publicKey) {
      // const counter = SystemProgram.createAccount({
      //   fromPubkey: publicKey,
      //   newAccountPubkey: mint.publicKey,
      //   lamports: Rent,
      //   space: 8,
      //   programId: PROGRAMM_ID,
      // });

      const instruction = new TransactionInstruction({
        programId: PROGRAMM_ID,
        keys: [
          {
            pubkey: pda,
            isSigner: false,
            isWritable: true,
          },
        ],
        data: Buffer.from([0x1]),
      });

      transaction.add(instruction);

      const signature = await sendTransaction(transaction, connection, {
        // signers: [mint],
      });
      console.log(signature);
      await connection.confirmTransaction(signature);
      console.log(signature);
      getdata();
    }
  };

  const getdata = async () => {
    const [pda] = await PublicKey.findProgramAddressSync(
      [new TextEncoder().encode("global_counter")],
      PROGRAMM_ID
    );

    console.log(pda.toBase58());

    const data = await connection.getAccountInfo(pda);
    // const decode = new BN(data?.data, 'le')
    if (!data) {
      return;
    }
    setCounterData(data?.data[0]);
    console.log(data?.data[0]);
  };

  useEffect(() => {
    getdata();
  }, [connection]);

  console.log(typeof counterData, "-=-=-=-=");

  return (
    <>
      <div>
        <h1 className="text-center">{counterData && counterData}</h1>
      </div>
      <div className="container m-4">
        <div className="row  justify-content-md-center">
          <div className="col-sm-3 m-1">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Increament Counter{" "}
            </button>
          </div>
          <div className="col-sm-3 m-1">
            <button className="btn btn-primary" onClick={getdata}>
              get Counter{" "}
            </button>
          </div>
          <div className="col-sm-3 m-1">
            <button className="btn btn-primary" onClick={handleDecreament}>
              Decreament Counter{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
