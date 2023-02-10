import React, { useState } from 'react'
import type {
  MarketValueDevelopmentEntity,
  PlayerProfile,
  PlayerProfileReponse,
  PlayersEntity,
  PlayerValueResponse,
} from '../types/transfer-market.dto'
import Image from 'next/image.js'
import { useQuery } from '@tanstack/react-query'
import { env } from '../env/client.mjs'
import axios from 'axios'
import SmallSpinner from './small-spinner'
import PlayerInfo from './player-info'
import { PlayerSelectModal } from './player-select-modal'

export const PlayerCard = ({ player, showModal }: { player: PlayersEntity, showModal: (value: boolean) => void }) => {

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['playerPrice', player.id],
    queryFn: () => getPlayerValue(player.id),
    enabled: false,
  })

  const getPlayerValue = async (
    id: number
  ): Promise<{
    marketValue: MarketValueDevelopmentEntity | undefined
    playerProfile: PlayerProfile
  }> => {
    const marketValue = await getPlayerMarketValue(id)
    const playerProfile = await getPlayerProfile(id)

    return { marketValue, playerProfile }
  }

  const fetchPlayerPrice = (e : MouseEvent) => {
    refetch()
    e.stopPropagation();
  }

  const displayModal = () => {
    showModal(true)
  }

  return (
    <>
      <div
        className="flex h-full w-full flex-col rounded-md border-4 border-stone-500 cursor-pointer"
        onClick={displayModal}
      >
        <div className="relative h-1/2 w-full">
          <Image
            alt="playerImage"
            src={player.playerImage}
            className="inline rounded"
            layout="fill"
          />
        </div>

        <div className="flex w-full items-center justify-center p-4 pb-0 font-bold">
          {player.playerName}
        </div>

        <div className="ml-2 flex flex-grow flex-row p-4">
          {!data && !isFetching && (
            <div className="flex h-full w-full items-center justify-center">
              <button
                className="mt-2 h-12 rounded bg-white p-2 text-black"
                onClick={(e) => fetchPlayerPrice(e)}
              >
                Show Info
              </button>
            </div>
          )}

          {isFetching ? (
            <div className="flex w-full items-center justify-center">
              <SmallSpinner />
            </div>
          ) : data ? (
            <PlayerInfo
              marketValue={data.marketValue}
              playerInfo={data.playerProfile}
            ></PlayerInfo>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  )
}

const getPlayerMarketValue = async (
  id: number
): Promise<MarketValueDevelopmentEntity | undefined> => {
  const options = {
    method: 'GET',
    url: 'https://transfermarket.p.rapidapi.com/players/get-market-value',
    params: { id: id, domain: 'com' },
    headers: {
      'X-RapidAPI-Key': env.NEXT_PUBLIC_TRANSFERMARKET_KEY,
      'X-RapidAPI-Host': env.NEXT_PUBLIC_TRANSFERMARKET_HOST,
    },
  }

  const data: PlayerValueResponse = (await axios.request(options)).data

  return data.marketValueDevelopment?.[0] || undefined
}

const getPlayerProfile = async (id: number): Promise<PlayerProfile> => {
  const options = {
    method: 'GET',
    url: 'https://transfermarket.p.rapidapi.com/players/get-profile',
    params: { id: id, domain: 'com' },
    headers: {
      'X-RapidAPI-Key': env.NEXT_PUBLIC_TRANSFERMARKET_KEY,
      'X-RapidAPI-Host': env.NEXT_PUBLIC_TRANSFERMARKET_HOST,
    },
  }

  const data: PlayerProfileReponse = (await axios.request(options)).data

  return data.playerProfile
}
