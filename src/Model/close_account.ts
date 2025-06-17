import * as borsh from "@coral-xyz/borsh";

export class CloseUser {
  instruction: number;

  constructor() {
    this.instruction = 1; // Assuming CloseUser is variant 1 in enum
  }

  static schema = borsh.struct([
    borsh.u8("instruction"), // Variant index
  ]);

  serialize(): Buffer {
    const buffer = Buffer.alloc(1); // Only 1 byte for enum variant
    CloseUser.schema.encode({ instruction: this.instruction }, buffer);
    return buffer;
  }
}
