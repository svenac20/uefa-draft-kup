import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import { useQuery } from "@tanstack/react-query";

const Home: NextPage = () => {

  return (
    <div>Test</div>
  );
};

export default Home;

