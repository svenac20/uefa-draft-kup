import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link.js";
import { useRouter } from "next/router";
import { Component, useEffect, useState } from "react";
import { constants } from "../types/local-storage.constants";

const Home: NextPage = () => {
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const [budget, setBudget] = useState(0)
  const router = useRouter()

  useEffect(() => {
    localStorage.removeItem(constants.BUDGET)
    localStorage.removeItem(constants.NUMBER_OF_PLAYERS)
  }, [])

  const startGame = () => {
    setLocalstorageVariables()
    router.push("/player-search")
  }

  const setLocalstorageVariables = () => {
    localStorage.setItem(constants.BUDGET, budget.toString())
    localStorage.setItem(constants.NUMBER_OF_PLAYERS, numberOfPlayers.toString())
    localStorage.setItem(constants.SELECTED_PLAYER, "1")
  }

  return (
    <div className="align-center flex h-full w-full justify-center p-4">
      <div className="flex flex-col justify-center gap-5">
        <div>
          <label htmlFor="players" className="block font-bold">
            Enter number of players:
          </label>
          <input
            type="number"
            id="players"
            name="players"
            className="mt-0 h-10 rounded pl-2 text-black"
            onChange={(e) => setNumberOfPlayers(Number(e.target.value))}
          ></input>
        </div>
        <div>
          <label htmlFor="budget" className="block font-bold">
            Enter budget (in M):
          </label>
          <input
            type="number"
            id="budget"
            name="budget"
            className="mt-0 h-10 rounded pl-2 text-black"
            onChange={(e) => setBudget(Number(e.target.value))}
          ></input>
        </div>
        <button className="mt-2 font-bold border-2 rounded h-10 bg-black-100" onClick={startGame}>
          {/* <Link
            className="m-auto rounded bg-white p-4 text-black"
            href={"/player-search"}
          > */}
            Start game
          {/* </Link> */}
        </button>
      </div>
    </div>
  );
};

export default Home;
