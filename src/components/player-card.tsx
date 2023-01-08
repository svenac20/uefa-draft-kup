import React from "react";
import type {
	MarketValueDevelopmentEntity,
  PlayersEntity,
  PlayerValueResponse,
} from "../types/transfer-market.dto";
import Image from "next/image.js";
import { useQuery } from "@tanstack/react-query";
import { env } from "../env/client.mjs";
import axios from "axios";
import SmallSpinner from "./small-spinner";

export const PlayerCard = ({ player }: { player: PlayersEntity }) => {
  const getPlayerValue = async (id: number): Promise<MarketValueDevelopmentEntity | undefined> => {
    const options = {
      method: "GET",
      url: "https://transfermarket.p.rapidapi.com/players/get-market-value",
      params: { id: id, domain: "com" },
      headers: {
        "X-RapidAPI-Key": env.NEXT_PUBLIC_TRANSFERMARKET_KEY,
        "X-RapidAPI-Host": env.NEXT_PUBLIC_TRANSFERMARKET_HOST,
      },
    };

    const data: PlayerValueResponse = (await axios.request(options)).data;

    if (!data) {
      return ;
    }
    return data.marketValueDevelopment?.[0];
  };

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["playerPrice", player.id],
    queryFn: () => getPlayerValue(player.id),
    enabled: false,
  });

  const fetchPlayerPrice = () => {
    refetch();
  };

  return (
    <div className="flex h-full w-full flex-row">
      <Image
        alt="playerImage"
        src={player.playerImage}
        width={100}
        height={100}
        className="inline rounded"
      />
      <div className="ml-2 flex flex-col">
        <span className="bold mt-2">
          {player.playerName} ({player.club})
        </span>
        <button
          className="mt-2 w-24 rounded bg-white p-2 text-black"
          onClick={(e) => fetchPlayerPrice()}
        >
          Show price
        </button>
        {isFetching ? (
					   <SmallSpinner/>
        ) : (
					data ? <span>{data.marketValue}{data.marketValueNumeral.toLocaleUpperCase()} {data.marketValueCurrency}</span> : ""
        )}
      </div>
    </div>
  );
};
