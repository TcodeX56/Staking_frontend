import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { Stake, Withdraw } from "../Model/stake";
import { Users } from "../Model/decodeData";

export const Staking = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const stake = async () => {
    if (publicKey) {
      const mintKeypair = new PublicKey(
        "6WC9dgDd7HZFkEukRyiBVeyx2GWuCAd228ubJkmNk3ZF"
      );

      const PROGRAM_ID = new PublicKey(
        "2t8XGgJD136x2CXaqLPWeuiCupVSm5m13DY4RUvZZKqL"
      );

      const pda = PublicKey.findProgramAddressSync(
        [Buffer.from("user_authority"), publicKey?.toBuffer()],
        PROGRAM_ID
      );

      console.log(pda[0].toBase58());

      const pda_vault = PublicKey.findProgramAddressSync(
        [Buffer.from("liquidity_authority_with_owner")],
        PROGRAM_ID
      );
      console.log(pda_vault[0].toBase58());

      const fromAssociatedAddress = await getAssociatedTokenAddress(
        mintKeypair,
        publicKey
      );

      console.log(fromAssociatedAddress.toBase58());

      const toAssociatedTokenAddress = await getAssociatedTokenAddress(
        mintKeypair,
        pda_vault[0],
        true
      );

      console.log(toAssociatedTokenAddress.toBase58());

      const transaction = new Transaction();
      const buffer = new Stake(1 * LAMPORTS_PER_SOL);
      const data = buffer.serialize();
      const instruction = new TransactionInstruction({
        keys: [
          {
            pubkey: mintKeypair,
            isSigner: false,
            isWritable: true,
          },
          {
            pubkey: pda[0],
            isSigner: false,
            isWritable: true,
          },
          {
            pubkey: pda_vault[0],
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
            pubkey: pda_vault[0],
            isSigner: false,
            isWritable: false,
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

      transaction.add(instruction);

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature);
      console.log(signature);
    }
  };

  const getDetails = async () => {
    const accountInfo = await connection.getAccountInfo(
      new PublicKey("7jaaYSuRmP2ksXTwRBQuj15dKHxtZcNJRNzRgmFkppLM")
    );
    if (!accountInfo) throw new Error("User account not found");

    const user = Users.deserialize(accountInfo.data);
    console.log("Decoded user:", Number(user.total_staked_ab));
  };

  const withdraw = async () => {
    if (publicKey) {
      const mintKeypair = new PublicKey(
        "6WC9dgDd7HZFkEukRyiBVeyx2GWuCAd228ubJkmNk3ZF"
      );

      const PROGRAM_ID = new PublicKey(
        "2t8XGgJD136x2CXaqLPWeuiCupVSm5m13DY4RUvZZKqL"
      );

      const pda = PublicKey.findProgramAddressSync(
        [Buffer.from("user_authority"), publicKey?.toBuffer()],
        PROGRAM_ID
      );

      console.log(pda[0].toBase58());

      const pda_vault = PublicKey.findProgramAddressSync(
        [Buffer.from("liquidity_authority_with_owner")],
        PROGRAM_ID
      );
      console.log(pda_vault[0].toBase58());

      const fromAssociatedAddress = await getAssociatedTokenAddress(
        mintKeypair,
        pda_vault[0], // the PDA vault is the source
        true
      );

      const toAssociatedTokenAddress = await getAssociatedTokenAddress(
        mintKeypair,
        publicKey // user is the recipient
      );

      const transaction = new Transaction();
      const buffer = new Withdraw(1 * LAMPORTS_PER_SOL);
      const data = buffer.serialize();
      const instruction = new TransactionInstruction({
        keys: [
          { pubkey: mintKeypair, isSigner: false, isWritable: false }, // 0
          { pubkey: pda[0], isSigner: false, isWritable: true }, // 1
          { pubkey: pda_vault[0], isSigner: false, isWritable: true }, // 2
          { pubkey: fromAssociatedAddress, isSigner: false, isWritable: true }, // 3
          {
            pubkey: toAssociatedTokenAddress,
            isSigner: false,
            isWritable: true,
          }, // 4
          { pubkey: publicKey, isSigner: false, isWritable: false }, // 5 - owner
          { pubkey: publicKey, isSigner: false, isWritable: false }, // 6 - recipient (same as owner)
          { pubkey: publicKey, isSigner: true, isWritable: false }, // 7 - payer
          {
            pubkey: SystemProgram.programId,
            isSigner: false,
            isWritable: false,
          }, // 8
          { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false }, // 9
          {
            pubkey: ASSOCIATED_TOKEN_PROGRAM_ID,
            isSigner: false,
            isWritable: false,
          }, // 10
        ],
        programId: PROGRAM_ID,
        data: data,
      });

      transaction.add(instruction);

      const signature = await sendTransaction(transaction, connection);
      const sim = await connection.simulateTransaction(transaction);
      console.log(sim.value.logs);
      await connection.confirmTransaction(signature);
      console.log(signature);
    }
  };

  return (
    <>
      <button className="btn btn-primary" onClick={stake}>
        {" "}
        stake Token
      </button>

      <button className="btn btn-primary" onClick={getDetails}>
        {" "}
        getDetails
      </button>

      <button className="btn btn-primary" onClick={withdraw}>
        {" "}
        withdraw
      </button>
    </>
  );
};
