import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { StudentIntro } from "../Model/Student";
import { PublicKey, SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js";

export const StudentTransaction = () => {
  const STUDENT_REVIEW_PROGRAMM_ID =
    "HdE95RSVsdb315jfJtaykXhXY478h53X6okDupVfY9yf";

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const handleSubmit = async () => {
    const student = new StudentIntro("LLLLLLL", "XXXXXXXXXXXXXX");
    handleTransactionSubmit(student);
  };

  const handleTransactionSubmit = async (student: StudentIntro) => {
    if (!publicKey) {
        return "please connect the wallet";
      }
    const buffer = student.serialize();
    const transaction = new Transaction();

    const [pda] = await PublicKey.findProgramAddressSync(
      [publicKey.toBuffer()],
      new PublicKey(STUDENT_REVIEW_PROGRAMM_ID)
    );

    console.log(pda)

    const instruction = new TransactionInstruction({
        keys: [
          {
            pubkey: publicKey,
            isSigner: true,
            isWritable: false,
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
        programId: new PublicKey(STUDENT_REVIEW_PROGRAMM_ID),
      });
      console.log(instruction, "instruction");
      transaction.add(instruction);
      const instructiondata = await sendTransaction(transaction, connection);
      console.log(instructiondata);
  };

  return <>
  
  <button onClick={handleSubmit}> send</button>
  </>;
};
