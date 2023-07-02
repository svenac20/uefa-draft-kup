import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import { env } from '../env/client.mjs'
import type {
  MarketValueDevelopmentEntity,
  PlayerProfile,
  PlayerProfileReponse,
  PlayersEntity,
  PlayerValueResponse,
} from '../types/transfer-market.dto'
import card from '../public/images/kartica-nova.png'
import Image from 'next/image'
import CountryCodeMap from '../types/country-codes'
import SmallSpinner from './small-spinner'
import { PlayerSelectModal } from './player-select-modal'

export const PlayerCard = ({
  player,
  selectedPlayer,
}: {
  player: PlayersEntity
  selectedPlayer: (
    player: PlayerProfile,
    marketValue: MarketValueDevelopmentEntity | undefined
  ) => void
}) => {
  const [showModal, setShowModal] = useState(false)
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

    playerProfile.countryImage = `https://flagcdn.com/w320/${CountryCodeMap.get(
      playerProfile.country
    )?.toLocaleLowerCase()}.png`
    playerProfile.playerImage = playerProfile.playerImage.replace(
      'medium',
      'big'
    )

    return { marketValue, playerProfile }
  }

  const fetchPlayerPrice = (e: React.MouseEvent) => {
    refetch()
    e.stopPropagation()
  }

  const onModalConfirm = () => {
    if (data) {
      selectedPlayer(data?.playerProfile, data?.marketValue)
    }
  }

  return (
    <>
      <PlayerSelectModal
        show={showModal}
        showModal={setShowModal}
        onModalConfirm={onModalConfirm}
      />
      <div
        className="relative flex h-full w-full max-w-[236px] cursor-pointer flex-col rounded-md border-2 border-green-800 max-h-[268px]"
        onClick={() => setShowModal(true)}
      >
        <Image src={card} fill={true} alt="kartica" />
        <div className="absolute -z-10 ml-2 h-1/2 w-player-image">
          <Image
            src={player.playerImage}
            alt="player-image"
            fill={true}
            sizes="100% 100%"
          />
        </div>
        <div className="z-1 absolute top-1 left-[52%] flex h-[48%] w-[46%] flex-col ">
          <div className="flex h-[49%] w-full items-center justify-center ">
            {!data ? (
              <button
                className="w-full h-full flex justify-center items-center rounded border-2 border-green-800 bg-transparent font-bold text-sm"
                onClick={fetchPlayerPrice}
              >
                <span>Show info</span>
              </button>
            ) : (
              <div className="relative w-full h-full">
                <Image
                  src={data?.playerProfile.countryImage}
                  alt="player-nation"
                  fill={true}
                  sizes="100% 100%"
                />
              </div>
            )}
          </div>
          <div className="relative  flex h-[50%] items-center justify-center  ">
            {isFetching ? (
              <div className="mt-2 mr-[3px]">
                <SmallSpinner />
              </div>
            ) : (
              <span className="mt-[5px] mr-[10px] font-bold"> 
                {data?.playerProfile.age}
              </span>
            )}
          </div>
        </div>
        <div className="absolute top-[49%] flex h-1/2 w-full flex-col items-center gap-1"> 
          <div className="relative z-10 ml-2 mt-2 flex h-[25%] w-[73%] items-center justify-center truncate "> 
            <span className="ml-3 truncate font-bold">{player.playerName}</span>
          </div>
          <div className="relative z-10 flex h-[25%] w-[73%]  justify-center truncate  ml-2">
            <span className="ml-3 truncate text-center font-bold">
              {player.club}
            </span>
          </div>
          <div className="w-player-price relative flex h-[22%] w-[73%] justify-center  font-bold  ml-2">
            {isFetching ? (
              <div className="pb-4 mb-3">
                <SmallSpinner />
              </div>
            ) : (
              <span className="">
                {data?.marketValue?.marketValue}
                {data?.marketValue?.marketValueNumeral.toLocaleUpperCase()}{' '}
                {data?.marketValue?.marketValueCurrency}{' '}
                {!data?.marketValue && data && '-€'}
              </span>
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
