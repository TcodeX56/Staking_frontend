import { useConnection } from "@solana/wallet-adapter-react";
import { useEffect, useState, type FC } from "react";
import { PublicKey } from "@solana/web3.js";
import { Movie } from "../Model/Movie";

export const MovieDetails:FC = () => {
  const MOVIE_REVIEW_PROGRAM_ID =
    "CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN";

  const { connection } = useConnection();
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchProgramAccounts = async () => {
      try {
        const accounts = await connection.getProgramAccounts(
          new PublicKey(MOVIE_REVIEW_PROGRAM_ID)
        );
  
        const movies1 = accounts
          .map(({ account }) => Movie.deserialize(account.data))
          .filter((movie): movie is Movie => movie != null); // Type guard
  
        setMovies(movies1);
      } catch (error) {
        console.error("Error fetching program accounts:", error);
      }
    };
  
    fetchProgramAccounts();
  }, [connection]);
  

  const fetchProgramAccounts = async () => {
    try {
      const accounts = await connection.getProgramAccounts(
        new PublicKey(MOVIE_REVIEW_PROGRAM_ID)
      );

      const movies1 = accounts
        .map(({ account }) => Movie.deserialize(account.data))
        .filter((movie): movie is Movie => movie != null); // Type guard

      setMovies(movies1);
    } catch (error) {
      console.error("Error fetching program accounts:", error);
    }
  };

  // console.log(movies)

  return (
    <>
      <button onClick={fetchProgramAccounts}> send</button>
    </>
  );
};
