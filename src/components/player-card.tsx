import Image from 'next/image'
import React, { useState } from 'react'
import card from '../public/images/kartica-nova.png'
import type {
  MarketValueDevelopmentEntity,
  PlayerProfile,
  PlayersEntity,
} from '../types/transfer-market.dto'
import { trpc } from '../utils/trpc'
import { PlayerSelectModal } from './player-select-modal'
import SmallSpinner from './small-spinner'

export const PlayerCard = ({
  player,
  selectedPlayer,
}: {
  player: PlayersEntity
  selectedPlayer: (
    player: PlayerProfile,
    marketValue: MarketValueDevelopmentEntity
  ) => void
}) => {
  const [showModal, setShowModal] = useState(false)
  const { data, isFetching, refetch } = trpc.playerSearch.playerValue.useQuery(
    { id: player.id.toString() },
    {
      enabled: false,
    }
  )

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
        className="relative flex h-full max-h-[370px]  w-full cursor-pointer flex-col font-fifa text-xl"
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
                className="flex h-full w-full items-center justify-center rounded border-2 border-green-800 bg-transparent  font-bold"
                onClick={fetchPlayerPrice}
              >
                <span>Show info</span>
              </button>
            ) : (
              <div className="relative h-full w-full">
                <Image
                  src={data?.playerProfile.countryImage}
                  alt="player-nation"
                  fill={true}
                  sizes="100% 100%"
                />
              </div>
            )}
          </div>
          <div className="relative flex h-[50%] items-center justify-center  ">
            {isFetching ? (
              <div className="mt-2 mr-[5px]">
                <SmallSpinner />
              </div>
            ) : (
              <span className="mt-[9px] mr-[15px] font-bold">
                {data?.playerProfile.age}
              </span>
            )}
          </div>
        </div>
        <div className="absolute top-[49%] flex h-1/2 w-full flex-col items-center gap-1">
          <div className="relative z-10 mt-2 flex h-[25%] w-[73%] items-center justify-center truncate ">
            <span className="ml-3 truncate font-bold">{player.playerName}</span>
          </div>
          <div className="relative z-10 ml-2 flex h-[25%]  w-[73%] justify-center  truncate">
            <span className="ml-3 mt-2 truncate text-center font-bold">
              {player.club}
            </span>
          </div>
          <div className="w-player-price relative ml-2 mt-2 flex h-[22%]  w-[73%]  justify-center font-bold">
            {isFetching ? (
              <div className="mb-3 ml-4 pb-4">
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
