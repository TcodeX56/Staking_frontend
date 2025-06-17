import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { User } from "../Model/User";
import {
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { CloseUser } from "../Model/close_account";
import { useEffect, useState } from "react";

interface UserDetail {
  name: string;
  age: string;
  address: string;
  city: string;
}

export const UserInfo = ({ detail }: { detail: UserDetail }) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const USER_PROGRAM_ID = "DVwb4x4drEjy6PDsYTPfKpBifDmfMYHzfXnpCMFV5j9s";

  const [users, setUsers] = useState<User[]>([]);

  console.log(detail,"detail")

  const handleSubmit = async () => {
    const user = new User(
      detail?.name,
      Number(detail?.age),
      detail.address,
      detail.city
    );
    handleTransacttionSubmit(user);
  };

  const handleTransacttionSubmit = async (user: User) => {
    if (!publicKey) {
      return;
    }

    const buffer = user.serialize();

    const [pda] = PublicKey.findProgramAddressSync(
      [new TextEncoder().encode("USER"), publicKey.toBuffer()],
      new PublicKey(USER_PROGRAM_ID)
    );
    console.log(pda.toBase58());

    const transaction = new Transaction();

    const instruction = new TransactionInstruction({
      keys: [
        {
          pubkey: pda,
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
      data: buffer,
      programId: new PublicKey(USER_PROGRAM_ID),
    });

    transaction.add(instruction);
    const signature = await sendTransaction(transaction, connection);
    console.log(signature);
    await connection.confirmTransaction(signature);
    console.log(signature);
    getdata();
  };

  const getdata = async () => {
    const data = await connection.getProgramAccounts(
      new PublicKey("DVwb4x4drEjy6PDsYTPfKpBifDmfMYHzfXnpCMFV5j9s")
    );

    console.log(data);

    const datadetails = data
      .map(({ account }) => User.deserialize(account.data))
      .filter((user): user is User => user != null); // filters out null/undefined

    if (datadetails.length > 0) {
      setUsers(datadetails);
    }
  };

  const handleDelete = async () => {
    if (!publicKey) {
      return;
    }
    const user = new CloseUser();

    const data = user.serialize();
    console.log(data);
    const tranaction = new Transaction();
    const [pda] = PublicKey.findProgramAddressSync(
      [new TextEncoder().encode("USER"), publicKey.toBuffer()],
      new PublicKey(USER_PROGRAM_ID)
    );

    const instruction = new TransactionInstruction({
      keys: [
        {
          pubkey: pda,
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
      data: data,
      programId: new PublicKey(USER_PROGRAM_ID),
    });

    tranaction.add(instruction);
    const signature = await sendTransaction(tranaction, connection);
    console.log(signature);
    await connection.confirmTransaction(signature);
    console.log(signature);
    getdata();
  };

  const handleUpdate = async () => {
    if (!publicKey) {
      return;
    }
    const user = new User(
      detail?.name,
      Number(detail?.age),
      detail.address,
      detail.city
    );

    const buffer = user.update_Serialize();

    const [pda] = PublicKey.findProgramAddressSync(
      [new TextEncoder().encode("USER"), publicKey.toBuffer()],
      new PublicKey(USER_PROGRAM_ID)
    );
    console.log(pda.toBase58());

    const transaction = new Transaction();

    const instruction = new TransactionInstruction({
      keys: [
        {
          pubkey: pda,
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
      data: buffer,
      programId: new PublicKey(USER_PROGRAM_ID),
    });

    
    transaction.add(instruction);
    const signature = await sendTransaction(transaction, connection);
    console.log(signature);
    await connection.confirmTransaction(signature);
    console.log(signature);
    getdata();
  };

  useEffect(() => {
    getdata();
  }, [connection]);

  return (
    <>
      <button className="btn btn-primary m-3" onClick={handleSubmit}>
        Add User details{" "}
      </button>
      <button className="btn btn-primary m-3" onClick={handleUpdate}>
        update User details{" "}
      </button>
      <button className="btn btn-primary m-3" onClick={handleDelete}>
        {" "}
        Delete User details
      </button>
     

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">AGe</th>
            <th scope="col">Address</th>
            <th scope="col">City</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((data, i) => (
            <tr>
              <th scope="row">{i}</th>
              <td>{data?.naam}</td>
              <td>{Number(data?.umr)}</td>
              <td>{data?.pata}</td>
              <td>{data?.gaam}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
