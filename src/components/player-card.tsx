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
        className="border-1 relative flex h-full w-full cursor-pointer flex-col rounded-md border-white"
        onClick={displayModal}
      >
        <Image src={card} style={{ objectFit: 'cover' }} alt="kartica" />
        <div className="h-1/2 w-1/2 absolute -z-10 left-1">
          <Image src={player.playerImage} alt="player-image" fill={true} />
        </div>
        <div className="h-1/5 w-1/2 absolute top-1 right-0 flex items-center justify-center p-15">
            <Image src={player.nationImage} alt="player-image"  fill={true}/>
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
