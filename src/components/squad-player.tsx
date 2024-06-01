import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import card from '../public/images/BASECARD.png'
import u21Card from '../public/images/U21-card.png'
import oldManIcon from '../public/images/starac-kartica.png'
import useGameSettingsStore from '../store/game-settings-store'
import usePlayerSquadStore from '../store/player-squad-store'
import { retiredClubName } from '../types/country-codes'
import type { PlayerPosition } from '../types/player-positions'
import { EmptyPlayerCard } from './empty-player-card'
import { PlayerSelectModal } from './player-select-modal'
import { StandardPlayerCard } from './standard-player-card'
import { IconPlayerCard } from './icon-player-card'

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

  const onRemovePlayer = () => {
    const player = getPlayer(index)
    removePlayerFromSquad(index, position)
    if (player?.age && player.age <= 21) {
      updatePerk(index, 'u21')
    }
    if (player?.club == retiredClubName || player?.club.includes('---')) {
      updatePerk(index, 'icon')
    }
    updateBudgetOnPlayerRemoval(
      index,
      Number(player?.marketValue.replace(/[^\d,]/g, '').replace(',', '.'))
    )
    refetch()
  }

  const getPlayerImage = () => {
    const player = getPlayer(index)
    if (player?.age && player?.age <= 21) {
      return u21Card
    } else if (player?.age && player?.age >= 32) {
      return oldManIcon
    }
    return card
  }

  return (
    <>
      {data ? (
        <>
          <div
            className={`flex max-h-[250px] cursor-pointer items-center justify-center font-fifa text-lg`}
          >
            <PlayerSelectModal
              text="Do you want to remove the selected player"
              show={showModal}
              showModal={setShowModal}
              onModalConfirm={onRemovePlayer}
            />
            <div
              className={`relative flex h-full w-56 max-w-xs cursor-pointer`}
              onClick={() => setShowModal(true)}
            >
              {data.club == retiredClubName || data.club.includes('---') ? (
                <IconPlayerCard
                  name={data.playerName}
                  countryImage={data.countryImage}
                  playerImage={data.playerImage}
                  textSmall={true}
                ></IconPlayerCard>
              ) : (
                <StandardPlayerCard data={data} image={getPlayerImage()} />
              )}
            </div>
          </div>
        </>
      ) : (
        <EmptyPlayerCard position={position} />
      )}
    </>
  )
}
