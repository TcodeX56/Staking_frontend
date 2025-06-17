import * as borsh from "@coral-xyz/borsh";

export class Token {
  token_title: string;
  token_symbol: string;
  token_uri: string;
  token_decimals: number;

  constructor(
    token_title: string,
    token_symbol: string,
    token_uri: string,
    token_decimals: number
  ) {
    this.token_title = token_title;
    this.token_symbol = token_symbol;
    this.token_uri = token_uri;
    this.token_decimals = token_decimals;
  }

  borshInstruction = borsh.struct([
    borsh.str("token_title"),
    borsh.str("token_symbol"),
    borsh.str("token_uri"),
    borsh.u8("token_decimals"),
  ]);

  serialize(): Buffer | undefined {
    try {
      const buffer = Buffer.alloc(1000);
      this.borshInstruction.encode({ ...this }, buffer);
      return buffer.subarray(0, this.borshInstruction.getSpan(buffer));
    } catch (error) {
      console.log(error);
    }
  }
}
