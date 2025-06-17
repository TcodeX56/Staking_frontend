import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { Init } from "../Model/initToken";
import { CreateToken } from "../Model/createToken";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { MINT } from "../Model/mint";
import { TRX } from "../Model/Trx";

export const TokenCreate = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const PROGRAM_ID = new PublicKey(
    "EKFpGCr6GQukXNmTUQyU9iLsK9mJmyWKa9PTDoMN89fP"
  );
  const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
  );

  const init = async () => {
    const buffer = new Init(0);

    const pda = PublicKey.findProgramAddressSync(
      [Buffer.from("mint_authority")],
      PROGRAM_ID
    );

    const data = buffer.serialize();
    const transaction = new Transaction();

    if (publicKey) {
      const instruction = new TransactionInstruction({
        keys: [
          {
            pubkey: pda[0],
            isSigner: false,
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
        programId: PROGRAM_ID,
        data: data,
      });

      transaction.add(instruction);

      const signature = await sendTransaction(transaction, connection);
      console.log(signature);
      await connection.confirmTransaction(signature);
      console.log(signature);
    }
  };

  const create = async () => {
    const mint = Keypair.generate();

    console.log(mint.publicKey.toBase58());

    const buffer = new CreateToken(
      "BITC",
      "BITC",
      "https://gateway.pinata.cloud/ipfs/bafkreifd73abrmitgfjmas6zmy4j4fmtiqphq6u5vtfciax7l4rkrezdom"
    );

    const pda = PublicKey.findProgramAddressSync(
      [Buffer.from("mint_authority")],
      PROGRAM_ID
    );

    const metadataAddress = PublicKey.findProgramAddressSync(
      [
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mint.publicKey.toBuffer(),
      ],
      TOKEN_METADATA_PROGRAM_ID
    )[0];

    const data = buffer.serialize();
    const transaction = new Transaction();

    if (publicKey) {
      const instruction = new TransactionInstruction({
        keys: [
          {
            pubkey: mint.publicKey,
            isSigner: true,
            isWritable: true,
          },
          {
            pubkey: pda[0],
            isSigner: false,
            isWritable: true,
          },
          {
            pubkey: metadataAddress,
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

      transaction.add(instruction);

      const signature = await sendTransaction(transaction, connection, {
        signers: [mint],
      });
      console.log(signature);
      await connection.confirmTransaction(signature);
      console.log(signature);
    }
  };

  const mintToken = async () => {
    if (publicKey) {
      const mintKeypair = new PublicKey(
        "6WC9dgDd7HZFkEukRyiBVeyx2GWuCAd228ubJkmNk3ZF"
      );

      const pda = PublicKey.findProgramAddressSync(
        [Buffer.from("mint_authority")],
        PROGRAM_ID
      );
      const metadataAddress = PublicKey.findProgramAddressSync(
        [
          Buffer.from("metadata"),
          TOKEN_METADATA_PROGRAM_ID.toBuffer(),
          mintKeypair.toBuffer(),
        ],
        TOKEN_METADATA_PROGRAM_ID
      )[0];

      const editionAddress = PublicKey.findProgramAddressSync(
        [
          Buffer.from("metadata"),
          TOKEN_METADATA_PROGRAM_ID.toBuffer(),
          mintKeypair.toBuffer(),
          Buffer.from("edition"),
        ],
        TOKEN_METADATA_PROGRAM_ID
      )[0];


     



      const associatedTokenAccountAddress = await getAssociatedTokenAddress(
        mintKeypair,
        pda[0]
      );

      const buffer = new MINT(100 * LAMPORTS_PER_SOL);
      const transaction = new Transaction();

      const data = buffer.serialize();

      const instruction = new TransactionInstruction({
        keys: [
          {
            pubkey: mintKeypair,
            isSigner: false,
            isWritable: true,
          },
          {
            pubkey: metadataAddress,
            isSigner: false,
            isWritable: true,
          },
          {
            pubkey: editionAddress,
            isSigner: false,
            isWritable: true,
          },
          {
            pubkey: pda[0],
            isSigner: false,
            isWritable: true,
          },
          {
            pubkey: associatedTokenAccountAddress,
            isSigner: false,
            isWritable: true,
          },
          {
            pubkey: publicKey,
            isSigner: false,
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
            pubkey: ASSOCIATED_TOKEN_PROGRAM_ID,
            isSigner: false,
            isWritable: false,
          },
          {
            pubkey: TOKEN_METADATA_PROGRAM_ID,
            isSigner: false,
            isWritable: false,
          },
        ],
        data: data,
        programId: PROGRAM_ID,
      });

      transaction.add(instruction);

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature);
      console.log(signature);
    }
  };

  const transfer = async () => {
    if (publicKey) {
      const mintKeypair = new PublicKey(
        "6WC9dgDd7HZFkEukRyiBVeyx2GWuCAd228ubJkmNk3ZF"
      );

      const recipent = new PublicKey(
        "EKFpGCr6GQukXNmTUQyU9iLsK9mJmyWKa9PTDoMN89fP"
      );

      const fromAssociatedAddress = await getAssociatedTokenAddress(
        mintKeypair,
        publicKey
      );
      console.log(fromAssociatedAddress.toBase58())

      const toAssociatedTokenAddress = await getAssociatedTokenAddress(
        mintKeypair,
        recipent
      );

      console.log(toAssociatedTokenAddress);

      const buffer = new TRX(10 * LAMPORTS_PER_SOL);
      const data = buffer.serialize();
      const instruction = new TransactionInstruction({
        keys: [
          {
            pubkey: mintKeypair,
            isSigner: false,
            isWritable: true,
          },
          {
            pubkey: fromAssociatedAddress,
            isSigner: false,
            isWritable: true,
          },
          {
            pubkey: toAssociatedTokenAddress,
            isSigner: false,
            isWritable: true,
          },
          {
            pubkey: publicKey,
            isSigner: true,
            isWritable: true,
          },
          {
            pubkey: recipent,
            isSigner: false,
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
          {
            pubkey: TOKEN_PROGRAM_ID,
            isSigner: false,
            isWritable: false,
          },
          {
            pubkey: ASSOCIATED_TOKEN_PROGRAM_ID,
            isSigner: false,
            isWritable: false,
          },
        ],
        data: data,
        programId: PROGRAM_ID,
      });

      const transaction = new Transaction();
      transaction.add(instruction);
      const signature = await sendTransaction(transaction, connection);
      console.log(signature);
      await connection.confirmTransaction(signature);
      console.log(signature);
    }
  };

  return (
    <>
      <div className="container mt-4">
        <button className="btn btn-primary" onClick={init}>
          {" "}
          Init
        </button>

        <button className="btn btn-primary mx-4" onClick={create}>
          {" "}
          create
        </button>
        <button className="btn btn-primary mx-4" onClick={mintToken}>
          {" "}
          Mint Token
        </button>
        <button className="btn btn-primary mx-4" onClick={transfer}>
          {" "}
          Transfer
        </button>
      </div>
    </>
  );
};
