import { type NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { env } from "../env/client.mjs";
import Image from "next/image.js";
import { PlayerCard } from "../components/player-card";
import type { PlayerSearchReponse } from "../types/transfer-market.dto.js";

const PlayerSearch = () => {
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

    const data: PlayerSearchReponse = (await axios.request(options)).data;
    return data.players;
  };

  // Using the hook
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["players"],
    queryFn: () => getPlayers(playerName),
    enabled: false,
  });

  return (
    <div className="w-full h-full p-3">
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


      <div className={`mt-4  ${!isFetching ? 'grid grid-cols-3 gap-1' : ''}`}>
        {!isFetching &&
          data &&
          data.map((player) => {
            return (
              <div key={player.id}>
                <PlayerCard player={player}></PlayerCard>
              </div>
            );
          })}
        {isFetching && (
          <div className="align-center h-full justify-center mt-4">
            <div className=" flex h-full items-center justify-center">
              <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900 border-white"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerSearch;
