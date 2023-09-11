import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Header from '../../components/Layout/header'
import { PlayerCard } from '../../components/player-card'
import useGameSettingsStore from '../../store/game-settings-store'
import usePlayerSquadStore from '../../store/player-squad-store'
import { retiredClubName } from '../../types/country-codes'
import type { PlayerPosition } from '../../types/player-positions'
import type {
  MarketValueDevelopmentEntity,
  PlayerProfile
} from '../../types/transfer-market.dto.js'
import type { UpdateSquad } from '../../types/update-squad.interface'
import { trpc } from '../../utils/trpc'

const PlayerSearch = () => {
  const router = useRouter()
  const { position } = router.query

  const [playerName, setPlayerName] = useState('')

  const addPlayerToSquad = usePlayerSquadStore((state) => state.addPlayerToSquad)
  const selectedPlayer = useGameSettingsStore((state) => state.selectedPlayer)
  const updateBudget = useGameSettingsStore((state) => state.updateBudget)
  const updatePerks = useGameSettingsStore((state) => state.updatePerk)

  const { data, isFetching, refetch } = trpc.playerSearch.searchPlayer.useQuery(
    { name: playerName },
    { enabled: false, refetchOnWindowFocus: false }
  )

  const searchNewPlayer = () => {
    refetch()
  }

  const handleSelectPlayer = (
    playerProfile: PlayerProfile,
    marketValue: MarketValueDevelopmentEntity
  ) => {
    const player: UpdateSquad = {
      index: selectedPlayer,
      playerProfile,
      marketValue,
      position: position as PlayerPosition,
    }

    addPlayerToSquad(player)
    if (Number(player.marketValue.age) <= 21) {
      updatePerks(selectedPlayer, "u21");
    } 
    if (player.playerProfile.club == retiredClubName) {
      updatePerks(selectedPlayer, "icon")
    }
    updateBudget(
      selectedPlayer,
      Number(marketValue.marketValue.replace(',', '.'))
    )
    router.push('/player-squad')
  }

  return (
    <>
      <Header></Header>
      <div className="relative flex h-5/6 w-full flex-col p-16 px-24">
        <div className="flex w-full flex-row px-8 pl-0">
          <div className="mr-4 flex w-2/4 flex-col">
            <label htmlFor="playerNameInput">Search player</label>
            <input
              id="playerNameInput"
              type="text"
              className="w-full rounded p-4 text-black"
              onChange={(e) => {
                setPlayerName(e.target.value)
              }}
              onKeyDown={(e) => {
                if (e.key == 'Enter') searchNewPlayer()
              }}
            />
          </div>
          <div className="flex flex-col-reverse">
            <button
              onClick={() => searchNewPlayer()}
              className="h-1/2 rounded bg-white p-2 text-black"
            >
              Search
            </button>
          </div>
          <div className="flex flex-grow flex-row items-end justify-end">
            <Link href={'/player-squad'}>
              <button className="rounded bg-white p-2 text-black">
                Return to squad
              </button>
            </Link>
          </div>
        </div>

        <div className="items-top grid h-full w-full grid-cols-5 flex-row justify-around gap-10 px-8 pl-2 pt-20">
          {!isFetching &&
            data &&
            data.map((player) => {
              return (
                <PlayerCard
                  player={player}
                  selectedPlayer={handleSelectPlayer}
                  key={player.id}
                ></PlayerCard>
              )
            })}
          {isFetching && (
            <div className="align-center col-span-5 mt-4 h-5/6 justify-center">
              <div className=" flex h-full items-center justify-center">
                <div className="h-32 w-32 animate-spin rounded-full border-b-2 "></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default PlayerSearch
