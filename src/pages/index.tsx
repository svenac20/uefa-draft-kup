import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link.js";

const Home: NextPage = () => {
  return (
    <div className="align-center flex h-screen w-screen justify-center p-4">
      <button>
        <Link
          className="m-auto rounded bg-white p-4 text-black"
          href={"/player-search"}
        >
          Start game
        </Link>
      </button>
    </div>
  );
};

export default Home;
