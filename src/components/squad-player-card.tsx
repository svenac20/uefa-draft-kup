import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import card from '../public/images/kartica-nova.png'
import cardIcon from '../public/images/ikona.png'
import usePlayerSquadStore from '../store/player-squad-store'
import type { PlayerPosition } from '../types/player-positions'
import { PlayerSelectModal } from './player-select-modal'
import useGameSettingsStore from '../store/game-settings-store'
import { retiredClubName } from '../types/country-codes'

export const SquadPlayercard = ({
  position,
  index,
}: {
  position: PlayerPosition
  index: number
}) => {
  const squad = usePlayerSquadStore((state) => state.squad)
  const removePlayerFromSquad = usePlayerSquadStore(
    (state) => state.removePlayerFromSquad
  )
  const updateBudgetOnPlayerRemoval = useGameSettingsStore(
    (state) => state.updateBudgetOnPlayerRemoval
  )
  const updatePerk = useGameSettingsStore((state) => state.updatePerk)
  const [showModal, setShowModal] = useState(false)

  const { data, refetch } = useQuery({
    queryKey: ['playerPrice', index, position],
    queryFn: () => getPlayer(index),
  })

  const getPlayer = (index: number) => {
    return squad[index]?.get(position) ?? null
  }

  const icon = data?.club == retiredClubName

  const onRemovePlayer = () => {
    const player = getPlayer(index)
    removePlayerFromSquad(index, position)
    if (player?.age && player.age <= 21) {
      updatePerk(index, "u21")
    }
    if (player?.club == retiredClubName) {
      updatePerk(index, "icon")
    }
    updateBudgetOnPlayerRemoval(
      index,
      Number(player?.marketValue.replace(/[^\d,]/g, '').replace(',', '.'))
    )
    refetch()
  }

  return (
    <>
      {data ? (
        <>
          <div className={`flex max-h-[227px] cursor-pointer items-center justify-center font-fifa text-lg ${icon ? "text-black" : ""}`}>
            <PlayerSelectModal
              text="Do you want to remove the selected player"
              show={showModal}
              showModal={setShowModal}
              onModalConfirm={onRemovePlayer}
            />
            <div
              className={`relative flex h-full w-60 cursor-pointer flex-col rounded-md border-2 ${icon ? "border-white" :"border-green-800" }`}
              onClick={() => setShowModal(true)}
            >
              {data.club == retiredClubName ? <Image src={cardIcon} fill={true} alt="kartica-icon" sizes="100%" /> : <Image src={card} fill={true} alt="kartica" sizes="100%" /> }
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
                  <div className="relative mb-1 h-[87%] w-[92%]">
                    <Image
                      src={data.countryImage}
                      alt="player-nation"
                      fill={true}
                      sizes="100%"
                    />
                  </div>
                </div>
                <div className="relative ml-5 mt-1 flex h-[40%] w-[60%] items-center justify-center">
                  <span className={`mr-1 font-bold ${icon ? "text-" : ""}`}>{data.age}</span>
                </div>
              </div>
              <div className="text-s absolute top-[50%] flex h-1/2 w-full flex-col items-center">
                <div className="relative z-10 ml-4 mt-[5px] flex h-[23%] w-[73%] justify-center truncate rounded-xl ">
                  <span className=" truncate font-bold">{data.playerName}</span>
                </div>
                <div className="relative z-10 ml-4 mt-[2px] flex h-[23%] w-[73%] justify-center truncate rounded-xl ">
                  <span className=" truncate font-bold">{data.club}</span>
                </div>
                <div className="w-player-price  relative ml-2 mt-[4px] flex flex h-[23%] w-[73%] items-center justify-center rounded-xl font-bold ">
                  <span className="ml-2">{data.marketValue}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex cursor-pointer items-center justify-center">
          <div className="relative h-full w-60 max-w-xs rounded-md border-2 border-green-800 border-opacity-20 opacity-70">
            <Link href={`/player-search/${position}`}>
              <Image src={card} fill={true} alt="kartica" sizes="100%" />
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
