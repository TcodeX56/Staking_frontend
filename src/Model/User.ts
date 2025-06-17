import * as borsh from "@coral-xyz/borsh";

export class User {
  naam: string;
  umr: Number;
  pata: string;
  gaam: string;

  constructor(naam: string, umr: Number, pata: string, gaam: string) {
    this.naam = naam;
    this.umr = umr;
    this.pata = pata;
    this.gaam = gaam;
  }

  borshInstruction = borsh.struct([
    borsh.u8("instruction"),
    borsh.str("naam"),
    borsh.u8("umr"),
    borsh.str("pata"),
    borsh.str("gaam"),
  ]);

  static borshUserSchema = borsh.struct([
    borsh.str("naam"),
    borsh.u8("umr"),
    borsh.str("pata"),
    borsh.str("gaam"),
  ]);

  serialize(): Buffer | undefined {
    try {
      const buffer = Buffer.alloc(1000);
      this.borshInstruction.encode({ instruction: 0, ...this }, buffer);
      return buffer.subarray(0, this.borshInstruction.getSpan(buffer));
    } catch (error) {
      console.log(error);
    }
  }

  update_Serialize(): Buffer | undefined {
    try {
      const buffer = Buffer.alloc(1000);
      this.borshInstruction.encode({ instruction: 2, ...this }, buffer);
      return buffer.subarray(0, this.borshInstruction.getSpan(buffer));
    } catch (error) {
      console.log(error);
    }
  }

  static deserialize(daat: Buffer): User | null | undefined {
    if (!daat) {
      return null;
    }
    console.log(daat);
    try {
      console.log("++++++++++");
      const { naam, umr, pata, gaam } = this.borshUserSchema.decode(daat);
      console.log(naam);
      return new User(naam, umr, pata, gaam);
    } catch (error) {
      console.log(error);
    }
  }

  serializeDetailUser(): Buffer | undefined {
    const buffer = Buffer.alloc(1000);
    this.borshInstruction.encode({ instruction: 1 }, buffer);
    return buffer.subarray(0, this.borshInstruction.getSpan(buffer));
  }
}
