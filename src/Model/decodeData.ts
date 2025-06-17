import { PublicKey } from "@solana/web3.js";
import * as borsh from "@coral-xyz/borsh";
import BN from "bn.js";

export class Users {
  id: number;
  referral_code: PublicKey;
  referrer: PublicKey;
  total_staked_ab: BN;
  totalbalance_ab: BN;
  balance_ab: BN;

  constructor(fields: {
    id: number;
    referral_code: Uint8Array;
    referrer: Uint8Array;
    total_staked_ab: BN;
    totalbalance_ab: BN;
    balance_ab: BN;
  }) {
    this.id = fields.id;
    this.referral_code = new PublicKey(fields.referral_code);
    this.referrer = new PublicKey(fields.referrer);
    this.total_staked_ab = fields.total_staked_ab;
    this.totalbalance_ab = fields.totalbalance_ab;
    this.balance_ab = fields.balance_ab;
  }

  static schema = borsh.struct([
    borsh.u8("id"),
    borsh.publicKey("referral_code"),
    borsh.publicKey("referrer"),
    borsh.u64("total_staked_ab"),
    borsh.u64("totalbalance_ab"),
    borsh.u64("balance_ab"),
  ]);

  static deserialize(buffer: Buffer): Users {
    const raw = this.schema.decode(buffer);
    return new Users(raw);
  }
}