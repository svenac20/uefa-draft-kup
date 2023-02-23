import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import router, { useRouter } from 'next/router'
import { useState } from 'react'
import Header from '../../components/Layout/header'
import { PlayerCard } from '../../components/player-card'
import { env } from '../../env/client.mjs'
import nextPageIcon from '../../public/images/next-page.png'
import previousPageIcon from '../../public/images/previous-page.png'
import useGameSettingsStore from '../../store/game-settings-store'
import usePlayerSquadStore from '../../store/player-squad-store'
import type { PlayerPosition } from '../../types/player-positions'
import type { MarketValueDevelopmentEntity, PlayerProfile, PlayerSearchReponse } from '../../types/transfer-market.dto.js'
import type { UpdateSquad } from '../../types/update-squad.interface'

const PlayerSearch = () => {
  const router = useRouter()
  const { position } = router.query

  const [playerName, setPlayerName] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [enabled, setEnabled] = useState(false)

  const addPlayerToSquad = usePlayerSquadStore(state => state.addPlayerToSquad)
  const selectedPlayer = useGameSettingsStore(state => state.selectedPlayer)
  const updateBudget = useGameSettingsStore(state => state.updateBudget)

  const getPlayers = async (name: string, page: number) => {
    const options = {
      method: 'GET',
      url: 'https://transfermarket.p.rapidapi.com/search',
      params: {
        query: name,
        domain: 'com',
        page: page.toLocaleString()
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
    queryKey: ['players', currentPage],
    queryFn: () => getPlayers(playerName,currentPage),
    enabled: enabled,
    refetchOnWindowFocus: false
  })

  const fetchPreviousPage = () => {
    if (currentPage != 1) {
      setEnabled(true)
      setCurrentPage(currentPage - 1)
    }
  }

  const fetchNextPage = () => {
    setEnabled(true)
    setCurrentPage(currentPage + 1)
  }

  const searchNewPlayer = () => {
    setEnabled(false)
    if (currentPage == 1) {
      refetch()  
    }
    else {
      setCurrentPage(1)
    }
  }

  const handleSelectPlayer = (playerProfile: PlayerProfile , marketValue: MarketValueDevelopmentEntity | undefined) => {
    if (!marketValue) {
      return
    }

    const player: UpdateSquad = {
      index: selectedPlayer,
      playerProfile,
      marketValue,
      position: position as PlayerPosition
    }
    
    
    addPlayerToSquad(player)
    updateBudget(selectedPlayer, Number(marketValue.marketValue.replace(",", ".")))
    router.push("/player-squad")
  }

  const onPlayerChange = (selectedPlayerIndex: number) => {
    return null
  }

  return (
    <>
      <Header onPlayerChange={onPlayerChange}></Header>
      <div className="flex h-5/6 w-full flex-col p-12">
        <div className="flex w-full flex-row">
          <div className="mr-4 flex w-2/4 flex-col">
            <label htmlFor="playerNameInput">Search player</label>
            <input
              id="playerNameInput"
              type="text"
              className="w-full rounded p-4 text-black"
              onChange={(e) => {setPlayerName(e.target.value);}} 
            ></input>
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
          {!isFetching && data && (
            <div className="flex h-full w-16 items-center justify-center p-4 pl-1 mr-2">
              <Image
                className="cursor-pointer"
                src={previousPageIcon}
                alt={'previous-page-icon'}
                width={67}
                height={68}
                onClick={(e) => fetchPreviousPage()}
              ></Image>
            </div>
          )}
          <div
            className={`mt-4  ${
              !isFetching && data
                ? 'grid flex-grow grid-cols-5 grid-rows-2 gap-16'
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
          {!isFetching && data && (
            <div className="flex h-full w-16 items-center justify-center p-4 pr-2">
              <Image
                className="cursor-pointer"
                src={nextPageIcon}
                alt={'next-page-icon'}
                width={67}
                height={68}
                onClick={(e) => fetchNextPage()}
              ></Image>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default PlayerSearch
