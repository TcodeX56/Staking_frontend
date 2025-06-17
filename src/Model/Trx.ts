import * as borsh from "@coral-xyz/borsh";
import BN from "bn.js";

export class TRX {
  amount: BN;

  constructor(amount: number | BN) {
    this.amount = new BN(amount);
  }

  borshInstruction = borsh.struct([
    borsh.u8("instruction"),
    borsh.u64("amount"),
  ]);

  serialize(): Buffer | undefined {
    try {
      const buffer = Buffer.alloc(1000);

      this.borshInstruction.encode({ ...this, instruction: 3 }, buffer);
      console.log(buffer, "buffer");
      return buffer.subarray(0, this.borshInstruction.getSpan(buffer));
    } catch (error) {
      console.log(error);
    }
  }

  manuallySerialize(): Buffer | undefined {
    try {
      const buffer = Buffer.alloc(1000);

      this.borshInstruction.encode({ ...this, instruction: 1 }, buffer);
      // console.log(buffer, "buffer");
      return buffer.subarray(0, this.borshInstruction.getSpan(buffer));
    } catch (error) {
      console.log(error);
    }
  }
}


