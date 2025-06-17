import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { AddressInfo } from "../Model/addressInfo";
import { useState } from "react";

export const AddresssInfo = () => {
  const AddressIn = new PublicKey(
    "AoTwXBkeqptSErW7TbnYn624BQ2s9jw9iXwrpiUktD2r"
  );
  const addressInfoAccount = Keypair.generate();
  const [address, setAddress] = useState<AddressInfo>();

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const handleSubmit = async () => {
    const addressInfo = new AddressInfo("AB", 207, "Haryana farm", "Haryana");

    handleTransacttionSubmit(addressInfo);
  };

  const handleTransacttionSubmit = async (info: AddressInfo) => {
    if (!publicKey) {
      return;
    }

    const buffer = info.serialize();
    const transaction = new Transaction();

    const [pda] = await PublicKey.findProgramAddressSync(
      [publicKey.toBuffer(), new TextEncoder().encode(info.name)],
      AddressIn
    );

    console.log(pda);

    const instruction = new TransactionInstruction({
      keys: [
        {
          pubkey: addressInfoAccount.publicKey,
          isSigner: true,
          isWritable: true,
        },
        {
          pubkey: publicKey,
          isSigner: true,
          isWritable: true,
        },
        {
          pubkey: SystemProgram.programId,
          isSigner: false,
          isWritable: false,
        },
      ],
      data: buffer,
      programId: AddressIn,
    });

    console.log(instruction, "instruction");
    transaction.add(instruction);
    const instructiondata = await sendTransaction(transaction, connection, {
      signers: [addressInfoAccount],
    });
    console.log(instructiondata, "+++++++++++++++++++");
  };

  const getdata = async () => {
    const AcccountData = new PublicKey(
      "4jJURjWj4XzgaDKxocyJv3wjRzRuE6QLaG5DoyF5jkvy"
    );

    const databiffer = await connection.getAccountInfo(AcccountData);

    if (!databiffer) {
      return;
    }
    const data = AddressInfo.deserialize(databiffer.data);
    console.log(data);
    if (!data) {
      return;
    }
    setAddress(data);
  };

  return (
    <>
      <button onClick={handleSubmit}>submit data </button>
      <button onClick={getdata}>submit dataaaaaaaaaaaaa </button>
      <h1> {address ? address.street : ""}</h1>
    </>
  );
};
