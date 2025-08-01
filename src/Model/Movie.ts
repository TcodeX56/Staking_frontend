import * as borsh from "@coral-xyz/borsh";

const ANCHOR_DISCRIMINATOR = 8; // 8 bytes for the account discriminator used by Anchor
const STRING_LENGTH_SPACE = 4; // 4 bytes to store the length of each string

// Specific sizes for 'title' and 'description' strings
const TITLE_SIZE = 100; // Allocate 100 bytes for the 'title'
const DESCRIPTION_SIZE = 500; // Allocate 500 bytes for the 'description'

// Total space calculation for the Movie review structure
const MOVIE_REVIEW_SPACE =
  ANCHOR_DISCRIMINATOR + // 8 bytes for the account discriminator
  STRING_LENGTH_SPACE +
  TITLE_SIZE + // 4 bytes for the title length + 100 bytes for the title
  STRING_LENGTH_SPACE +
  DESCRIPTION_SIZE + // 4 bytes for the description length + 500 bytes for the description
  1 + // 1 byte for 'variant'
  1; // 1 byte for 'rating'

export class Movie {
  title: string;
  rating: number;
  description: string;

  constructor(title: string, rating: number, description: string) {
    // Enforce specific sizes for title and description
    if (title.length > TITLE_SIZE) {
      throw new Error(`Title cannot exceed ${TITLE_SIZE} characters.`);
    }
    if (description.length > DESCRIPTION_SIZE) {
      throw new Error(
        `Description cannot exceed ${DESCRIPTION_SIZE} characters.`
      );
    }

    this.title = title;
    this.rating = rating;
    this.description = description;
  }

  static mocks: Movie[] = [
    new Movie(
      "The Shawshank Redemption",
      5,
      `For a movie shot entirely in prison where there is no hope at all, shawshank redemption's main message and purpose is to remind us of hope, that even in the darkest places hope exists, and only needs someone to find it. Combine this message with a brilliant screenplay, lovely characters and Martin freeman, and you get a movie that can teach you a lesson every time you watch it. An all time Classic!!!`
    ),
    new Movie(
      "The Godfather",
      5,
      `One of Hollywood's greatest critical and commercial successes, The Godfather gets everything right; not only did the movie transcend expectations, it established new benchmarks for American cinema.`
    ),
    new Movie(
      "The Godfather: Part II",
      4,
      `The Godfather: Part II is a continuation of the saga of the late Italian-American crime boss, Francis Ford Coppola, and his son, Vito Corleone. The story follows the continuing saga of the Corleone family as they attempt to successfully start a new life for themselves after years of crime and corruption.`
    ),
    new Movie(
      "The Dark Knight",
      5,
      `The Dark Knight is a 2008 superhero film directed, produced, and co-written by Christopher Nolan. Batman, in his darkest hour, faces his greatest challenge yet: he must become the symbol of the opposite of the Batmanian order, the League of Shadows.`
    ),
  ];

  borshInstructionSchema = borsh.struct([
    borsh.u8("variant"),
    borsh.str("title"),
    borsh.u8("rating"),
    borsh.str("description"),
  ]);
// get data solana blockchain 

  static borshAccountsSchema = borsh.struct([
    borsh.u8("title"),
    borsh.u8("rating"),
    borsh.str("description"),
  ]);

  serialize(): Buffer | undefined {
    try {
      const buffer = Buffer.alloc(MOVIE_REVIEW_SPACE);
      this.borshInstructionSchema.encode({ ...this, variant: 0 }, buffer);
      return buffer.subarray(0, this.borshInstructionSchema.getSpan(buffer));
    } catch (error) {
      console.log(error);
    }
  }

  static deserialize(buffer: Buffer): Movie | null | undefined {
    if (!buffer) {
      return null;
    }
    try {
      const { title, rating, description } =
        this.borshAccountsSchema.decode(buffer);
      return new Movie(title, rating, description);
    } catch (error) {
      console.log(error);
    }
  }
}
