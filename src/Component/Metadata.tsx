import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import React, { useEffect } from "react";
import * as borsh from "@coral-xyz/borsh";

export const Metadata = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  const PROGRAM_ID = new PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
  );
  const tokenMint = new PublicKey(
    "3YJNk75E5DRJahK97XyhELUHHCfwJfHzxs835EjwkfT3"
  );

  const getMetaData = async () => {
    const seeds = [
      Buffer.from("metadata"),
      PROGRAM_ID.toBytes(),
      tokenMint.toBytes(),
    ];
    // console.log(seeds,"seeds")
    const [pda, bump] = await PublicKey.findProgramAddressSync(
      seeds,
      PROGRAM_ID
    );
    // console.log(pda.toBase58(), bump, "pdadsrfgsdg");

    const borshInstructionSchema = borsh.struct([
      borsh.u8("key"),
      borsh.publicKey("updateAuthority"),
      borsh.publicKey("mint"),
      borsh.str("name"),
      borsh.str("symbol"),
      borsh.str("uri"),
      borsh.u16("stellerFeeBasicPoints"),
      borsh.option(
        borsh.vec(
          borsh.struct([
            borsh.publicKey("address"),
            borsh.bool("verifed"),
            borsh.u8("share"),
          ]),
          "creatorArray"
        ),
        "creator"
      ),
      borsh.bool("primarySaleHappened"),
      borsh.bool("isMustable"),
      borsh.option(
        borsh.struct([borsh.u16("editionNonceValue")]),
        "editionNonce"
      ),
      // borsh.option(
      //   borsh.struct([borsh.u16("tokenStandardValue")]),
      //   "tokenStandard"
      // ),
      // borsh.option(
      //   borsh.struct([borsh.bool("verified"), borsh.publicKey("key")]),
      //   "collection"
      // ),
      // borsh.option(
      //   borsh.struct([
      //     borsh.u8("useMethod"),
      //     borsh.u64("remaining"),
      //     borsh.u64("total"),
      //   ]),
      //   "uses"
      // ),
      // borsh.option(borsh.struct([borsh.u64("details")]), "collectionDetails"),
    ]);
    // console.log(borshInstructionSchema, "borshInstructionSchema");

    const accountInfo = await connection.getAccountInfo(pda);
    // console.log(accountInfo);

    const metadata1 = await borshInstructionSchema.decode(accountInfo?.data);
    console.log(metadata1);
  };
  useEffect(() => {
    getMetaData();
  }, [connection]);

  return (
    <>
      {publicKey && publicKey.toBase58()}

      <button onClick={getMetaData}>click</button>
    </>
  );
};
