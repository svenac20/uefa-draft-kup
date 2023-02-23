import Link from 'next/link'
import router from 'next/router'
import React, { useEffect, useRef } from 'react'
import type { PlayerPosition } from '../types/player-positions'
import useGameSettingsStore from '../store/game-settings-store'
import usePlayerSquadStore from '../store/player-squad-store'
import { PlayerCard } from './player-card'
import Image from 'next/image'
import card from '../public/images/Kartica.png'
import { useQuery } from '@tanstack/react-query'

export const SquadPlayercard = ({ position, index }: { position: PlayerPosition, index: number }) => {
  const squad = usePlayerSquadStore((state) => state.squad)

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['playerPrice', index, position],
    queryFn: () => getPlayer(index),
  })
  
  const getPlayer = (index: number) => {
    return squad[index]?.get(position) ?? null
  }

  return (
    <div className="flex cursor-pointer items-center justify-center">
      {data ? (
        <>
          <div className="relative flex h-full w-60 cursor-pointer flex-col rounded-md border-2 border-green-800">
            <Image src={card} fill={true} alt="kartica" />
            <div className="absolute -z-10 ml-1 h-1/2 w-player-image">
              <Image
                src={data.playerImage.replace('medium', 'big')}
                alt="player-image"
                fill={true}
                sizes="100%"
              />
            </div>
            <div className="z-1 absolute top-1 left-1/2 flex h-1/2 w-1/2 flex-col">
              <div className="flex h-1/2 w-full items-center justify-center">
                <div className="relative mb-1 h-[87%] w-[89%]">
                  <Image
                    src={data.countryImage}
                    alt="player-nation"
                    fill={true}
                    sizes="100%"
                  />
                </div>
              </div>
              <div className="relative ml-5 mt-1 flex h-[40%] w-[60%] items-center justify-center">
                  <span className="font-bold">{data.age}</span>
              </div>
            </div>
            <div className="absolute top-[49%] h-1/2 w-full">
              <div className="relative z-10 ml-8 mt-1 flex h-[36%] w-[73%] items-center justify-center truncate rounded-xl">
                <span className="truncate font-bold">{data.playerName}</span>
              </div>
              <div className="w-player-price  relative ml-8 mt-2 flex h-[36%] w-[73%]  items-center justify-center rounded-xl font-bold">
                  <span>
                    {data.marketValue}
                  </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Link href={`/player-search/${position}`}>Ovdje ide player</Link>
      )}
    </div>
  )
}
