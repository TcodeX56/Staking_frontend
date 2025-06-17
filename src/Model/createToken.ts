import * as borsh from "@coral-xyz/borsh";

export class CreateToken {
  nft_title: string;
  nft_symbol: string;
  nft_uri: string;

  constructor(nft_title: string, nft_symbol: string, nft_uri: string) {
    this.nft_title = nft_title;
    this.nft_symbol = nft_symbol;
    this.nft_uri = nft_uri;
  }

  borshInstruction = borsh.struct([
    borsh.u8("instruction"),
    borsh.str("nft_title"),
    borsh.str("nft_symbol"),
    borsh.str("nft_uri"),
  ]);

  serialize(): Buffer | undefined {
    try {
      const buffer = Buffer.alloc(1000);
      this.borshInstruction.encode({ instruction: 1, ...this }, buffer);
      return buffer.subarray(0, this.borshInstruction.getSpan(buffer));
    } catch (error) {
      console.log(error);
    }
  }
}
