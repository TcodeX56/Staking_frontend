import * as borsh from "@coral-xyz/borsh";
import { Buffer } from "buffer";
import BN from "bn.js"; // ✅ make sure this is imported

const MintInstructionSchema = borsh.struct([
  borsh.u8("instruction"),
  borsh.u64("amount"),
]);

export class MINT {
  amount: BN;

  constructor(amount: number | BN) {
    this.amount = BN.isBN(amount) ? amount : new BN(amount);
  }

  serialize(): Buffer | undefined {
    try {
      const buffer = Buffer.alloc(100);
      MintInstructionSchema.encode({ instruction: 2, amount: this.amount }, buffer);
      return buffer.subarray(0, MintInstructionSchema.getSpan(buffer));
    } catch (error) {
      console.error("Serialization error:", error);
    }
  }
}
