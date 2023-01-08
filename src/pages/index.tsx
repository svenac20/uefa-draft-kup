import { type NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { env } from "../env/client.mjs";
import { TransferMarketResponse } from "../types/transfer-market.dto.js";
import Image from "next/image.js";

const Home: NextPage = () => {
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState("");

  const getPlayers = async (name: string) => {
    const options = {
      method: "GET",
      url: "https://transfermarket.p.rapidapi.com/search",
      params: { query: name, domain: "com" },
      headers: {
        "X-RapidAPI-Key": env.NEXT_PUBLIC_TRANSFERMARKET_KEY,
        "X-RapidAPI-Host": env.NEXT_PUBLIC_TRANSFERMARKET_HOST,
      },
    };

    const data: TransferMarketResponse = (await axios.request(options)).data;
    return data.players;
  };

  // Using the hook
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["players"],
    queryFn: () => getPlayers(playerName),
    enabled: false,
  });

  return (
    <div className="w-screen p-4">
      <div className="flex w-full flex-row">
        <div className="mr-4 flex w-2/4 flex-col">
          <label htmlFor="playerNameInput">Search player</label>
          <input
            id="playerNameInput"
            type="text"
            className="w-full rounded p-4 text-black"
            onChange={(e) => setPlayerName(e.target.value)}
          ></input>
        </div>
        <div className="flex flex-col-reverse">
          <button
            onClick={(e) => refetch()}
            className="h-1/2 rounded bg-white p-2 text-black"
          >
            Search
          </button>
        </div>
      </div>

      <div className="mt-2">
        {data && data.map(player => {
          return <div key={player.id}>
            <Image
              alt="playerImage"
              src={player.playerImage}
              width={100}
              height={100}
              className="inline"
            />
            <span className="ml-3">{player.playerName}</span>
          </div>
        })}
      </div>
    </div>
  );
};

export default Home;
