import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { env } from '../env/client.mjs'
import type {
  MarketValueDevelopmentEntity,
  PlayerProfile,
  PlayerProfileReponse,
  PlayersEntity,
  PlayerValueResponse,
} from '../types/transfer-market.dto'
import card from '../public/images/Kartica.png'
import Image from 'next/image'
import CountryCodeMap from '../types/country-codes'
import SmallSpinner from './small-spinner'

export const PlayerCard = ({
  player,
  showModal,
}: {
  player: PlayersEntity
  showModal: (value: boolean) => void
}) => {
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

  const fetchPlayerPrice = (e: React.MouseEvent) => {
    refetch()
    e.stopPropagation()
  }

  const displayModal = () => {
    showModal(true)
  }

  return (
    <>
      <div
        className="relative flex h-full w-full cursor-pointer flex-col rounded-md border-2 border-green-800"
        onClick={displayModal}
      >
        <Image src={card} fill={true} alt="kartica" />
        <div className="absolute -z-10 ml-1 h-1/2 w-player-image">
          <Image
            src={player.playerImage.replace('medium', 'big')}
            alt="player-image"
            fill={true}
            sizes="100%"
          />
        </div>
        <div className="z-1 absolute top-1 left-1/2 flex h-1/2 w-1/2 flex-col">
          <div className="flex h-1/2 w-full items-center justify-center">
            {!data ? (
              <button
                className="h-1/2 rounded bg-green-800 p-2 font-bold"
                onClick={fetchPlayerPrice}
              >
                Show info
              </button>
            ) : (
              <div className="relative mb-1 h-[87%] w-[89%]">
                <Image
                  src={`https://countryflagsapi.com/png/${CountryCodeMap.get(
                    data?.playerProfile.country
                  )}`}
                  alt="player-nation"
                  fill={true}
                  sizes="100%"
                />
              </div>
            )}
          </div>
          <div className="relative ml-5 mt-1 flex h-[40%] w-[60%] items-center justify-center">
            {isFetching ? (
              <div className="ml-2">
                <SmallSpinner />
              </div>
            ) : (
              <span className="font-bold">{data?.playerProfile.age}</span>
            )}
          </div>
        </div>
        <div className="absolute top-[49%] h-1/2 w-full">
          <div className="relative z-10 ml-8 mt-1 flex h-[36%] w-[73%] items-center justify-center truncate rounded-xl">
            <span className="truncate font-bold">{player.playerName}</span>
          </div>
          <div className="w-player-price  relative ml-8 mt-2 h-[36%] w-[73%] rounded-xl  flex items-center justify-center font-bold">
            {isFetching ? (
              <SmallSpinner />
            ) : (
              <span>{data?.marketValue?.marketValue}{data?.marketValue?.marketValueNumeral.toLocaleUpperCase()} {data?.marketValue?.marketValueCurrency} </span>
            )}
          </div>
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
