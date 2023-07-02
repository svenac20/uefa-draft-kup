import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import Header from '../../components/Layout/header'
import { PlayerCard } from '../../components/player-card'
import { env } from '../../env/client.mjs'
import useGameSettingsStore from '../../store/game-settings-store'
import usePlayerSquadStore from '../../store/player-squad-store'
import type { PlayerPosition } from '../../types/player-positions'
import type {
  MarketValueDevelopmentEntity,
  PlayerProfile,
  PlayerSearchReponse,
} from '../../types/transfer-market.dto.js'
import type { UpdateSquad } from '../../types/update-squad.interface'
import background from '../../public/images/pozadina.png'
import Image from 'next/image'

const PlayerSearch = () => {
  const router = useRouter()
  const { position } = router.query

  const [playerName, setPlayerName] = useState('')
  const [enabled, setEnabled] = useState(false)

  const addPlayerToSquad = usePlayerSquadStore(
    (state) => state.addPlayerToSquad
  )
  const selectedPlayer = useGameSettingsStore((state) => state.selectedPlayer)
  const updateBudget = useGameSettingsStore((state) => state.updateBudget)

  const getPlayers = async (name: string) => {
    const options = {
      method: 'GET',
      url: 'https://transfermarket.p.rapidapi.com/search',
      params: {
        query: name,
        domain: 'com',
      },
      headers: {
        'X-RapidAPI-Key': env.NEXT_PUBLIC_TRANSFERMARKET_KEY,
        'X-RapidAPI-Host': env.NEXT_PUBLIC_TRANSFERMARKET_HOST,
      },
    }

    const data: PlayerSearchReponse = (await axios.request(options)).data
    return data.players
  }

  // Using the hook
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['players'],
    queryFn: () => getPlayers(playerName),
    enabled: enabled,
    refetchOnWindowFocus: false,
  })

  const searchNewPlayer = () => {
    setEnabled(false)
    refetch()
  }

  const handleSelectPlayer = (
    playerProfile: PlayerProfile,
    marketValue: MarketValueDevelopmentEntity | undefined
  ) => {
    if (!marketValue) {
      marketValue = {} as MarketValueDevelopmentEntity
      marketValue.marketValueNumeral = 'M'
      marketValue.marketValue = '0'
      marketValue.marketValueCurrency = '€'
    }

    const player: UpdateSquad = {
      index: selectedPlayer,
      playerProfile,
      marketValue,
      position: position as PlayerPosition,
    }

    addPlayerToSquad(player)
    updateBudget(
      selectedPlayer,
      Number(marketValue.marketValue.replace(',', '.'))
    )
    router.push('/player-squad')
  }

  return (
    <>
      <Header></Header>
      <div className="flex h-5/6 w-full flex-col p-16 px-24 relative">
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
              onClick={(e) => searchNewPlayer()}
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

        <div className="flex-column flex w-full flex-grow p-8 pl-2">
          <div
            className={`mt-4  ${
              !isFetching && data
                ? 'grid flex-grow grid-cols-5 grid-rows-2 gap-20'
                : 'w-full'
            }`}
          >
            {!isFetching &&
              data &&
              data.map((player) => {
                player.playerImage = player.playerImage.replace('medium', 'big')
                return (
                  <PlayerCard
                    player={player}
                    selectedPlayer={handleSelectPlayer}
                    key={player.id}
                  ></PlayerCard>
                )
              })}
            {isFetching && (
              <div className="align-center mt-4 h-5/6 justify-center">
                <div className=" flex h-full items-center justify-center">
                  <div className="h-32 w-32 animate-spin rounded-full border-b-2 "></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default PlayerSearch
