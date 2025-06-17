import * as borsh from "@coral-xyz/borsh";
import { Buffer } from "buffer";
import BN from "bn.js"; // ✅ make sure this is imported

const MintInstructionSchema = borsh.struct([
  borsh.u8("instruction"),
  borsh.u64("amount"),
]);

export class TRX {
  amount: BN;

  constructor(amount: number | BN) {
    this.amount = BN.isBN(amount) ? amount : new BN(amount);
  }

  serialize(): Buffer | undefined {
    try {
      const buffer = Buffer.alloc(100);
      MintInstructionSchema.encode({ instruction: 3, amount: this.amount }, buffer);
      return buffer.subarray(0, MintInstructionSchema.getSpan(buffer));
    } catch (error) {
      console.error("Serialization error:", error);
    }
  }
}


// let account_iter = &mut accounts.iter();
//     let mint_account = next_account_info(account_iter)?;
//     let from_associated_token_account = next_account_info(account_iter)?;
//     let to_associated_token_account = next_account_info(account_iter)?;
//     let owner = next_account_info(account_iter)?;
//     let recipent = next_account_info(account_iter)?;
//     let payer = next_account_info(account_iter)?;
//     let system_program = next_account_info(account_iter)?;
//     let token_program = next_account_info(account_iter)?;
//     let associted_token_program = next_account_info(account_iter)?;