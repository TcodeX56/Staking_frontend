import * as borsh from "@coral-xyz/borsh";

export class AddressInfo {
  name: string;
  house_number: Number;
  street: string;
  city: string;

  constructor(
    name: string,
    house_number: Number,
    street: string,
    city: string
  ) {
    this.name = name;
    this.house_number = house_number;
    this.street = street;
    this.city = city;
  }

  borshInstruction = borsh.struct([
    borsh.str("name"),
    borsh.u8("house_number"),
    borsh.str("street"),
    borsh.str("city"),
  ]);

  static borshInstruction = borsh.struct([
    borsh.str("name"),
    borsh.u8("house_number"),
    borsh.str("street"),
    borsh.str("city"),
  ]);

  serialize(): Buffer | undefined {
    try {
      const buffer = Buffer.alloc(1000);
      this.borshInstruction.encode({ ...this }, buffer);
      console.log(buffer, "bufferbufferbuffer");
      return buffer.subarray(0, this.borshInstruction.getSpan(buffer));
    } catch (error) {
      console.log("bufferbufferbuffer");
      console.log(error);
    }
  }

 static deserialize(buffer: Buffer): AddressInfo | null | undefined {
    if (!buffer) {
      return;
    }

    try {
      const { name, house_number, street, city } =
        this.borshInstruction.decode(buffer);
      return new AddressInfo(name, house_number, street, city);
    } catch (error) {
      console.log(error);
    }
  }
}
