import { publicKey } from "@coral-xyz/borsh";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Keypair,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { Token } from "../Model/Token";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

export const TokenCreator = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const PROGRAM_ID = new PublicKey(
    "J7WgTSUR9X1q7ZEps7fvuj9VfTweBNxShnc3GiwDxLN9"
  );

  const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
  );


  
  const mint = Keypair.generate();
  const metadataAddress = PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      mint.publicKey.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID
  );

  const createToken = async () => {
    const buffer = new Token(
      "BITC",
      "BITC",
      "https://gateway.pinata.cloud/ipfs/bafkreifd73abrmitgfjmas6zmy4j4fmtiqphq6u5vtfciax7l4rkrezdom",
      9
    );

    const data = buffer.serialize();

    const transaction = new Transaction();

    if (publicKey) {
      const ix = new TransactionInstruction({
        keys: [
          {
            pubkey: mint.publicKey,
            isSigner: true,
            isWritable: true,
          },
          {
            pubkey: publicKey,
            isSigner: true,
            isWritable: true,
          },
          {
            pubkey: metadataAddress[0],
            isSigner: false,
            isWritable: true,
          },
          {
            pubkey: publicKey,
            isSigner: true,
            isWritable: true,
          },
          {
            pubkey: SYSVAR_RENT_PUBKEY,
            isSigner: false,
            isWritable: false,
          },
          {
            pubkey: SystemProgram.programId,
            isSigner: false,
            isWritable: false,
          },
          {
            pubkey: TOKEN_PROGRAM_ID,
            isSigner: false,
            isWritable: false,
          },
          {
            pubkey: TOKEN_METADATA_PROGRAM_ID,
            isSigner: false,
            isWritable: false,
          },
        ],
        programId: PROGRAM_ID,
        data: data,
      });

      transaction.add(ix);
      const signature = await sendTransaction(transaction, connection, {
        signers: [mint],
      });
      console.log(signature);

      await connection.confirmTransaction(signature);
      console.log(signature);
    }
  };

  return (
    <>
      <button className="btn btn-primary" onClick={createToken}>
        {" "}
        create Token
      </button>
    </>
  );
};
