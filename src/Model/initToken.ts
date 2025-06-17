import * as borsh from "@coral-xyz/borsh";

export class Init {
  instruction: number;

  constructor(instruction: number) {
    this.instruction = instruction;
  }

  borshInstruction = borsh.struct([borsh.u8("instruction")]);

  serialize(): Buffer | undefined {
    try {
      let buferr = Buffer.alloc(100);
      this.borshInstruction.encode({ ...this }, buferr);
      return buferr.subarray(0, this.borshInstruction.getSpan(buferr));
    } catch (error) {
      console.log(error);
    }
  }
}
