import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'
import Header from '../../components/Layout/header'
import { PlayerCard } from '../../components/player-card'
import { env } from '../../env/client.mjs'
import nextPageIcon from '../../public/images/next-page.png'
import previousPageIcon from '../../public/images/previous-page.png'
import type { PlayerSearchReponse } from '../../types/transfer-market.dto.js'
import type { PlayerPosition } from '../../types/player-positions'
import Link from 'next/link'

const PlayerSearch = ({ position }: { position: PlayerPosition }) => {
  const [playerName, setPlayerName] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const getPlayers = async (name: string) => {
    console.log(currentPage)
    const options = {
      method: 'GET',
      url: 'https://transfermarket.p.rapidapi.com/search',
      params: {
        query: name,
        domain: 'com',
        page: currentPage.toLocaleString(),
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
    enabled: false,
  })

  return (
    <>
      <Header></Header>
      <div className="flex h-5/6 w-full flex-col p-8">
        <div className="flex w-full flex-row">
          <div className="mr-4 flex w-2/4 flex-col">
            <label htmlFor="playerNameInput">Search player</label>
            <input
              id="playerNameInput"
              type="text"
              className="w-full rounded p-4 text-black"
              onChange={(e) => setPlayerName(e.target.value)}
            ></input>
          </div>
          <div className="flex flex-col-reverse">
            <button
              onClick={(e) => refetch()}
              className="h-1/2 rounded bg-white p-2 text-black"
            >
              Search
            </button>
          </div>
          <div className="flex items-end justify-end flex-row flex-grow">
            <Link href={'/player-squad'}>
              <button className="rounded bg-white p-2 text-black">
                Return to squad
              </button>
            </Link>
          </div>
        </div>

        <div className="flex-column flex w-full flex-grow p-8">
          {!isFetching && data && (
            <div className="flex h-full w-16 items-center justify-center p-4 pl-1">
              <Image
                src={previousPageIcon}
                alt={'previous-page-icon'}
                width={67}
                height={68}
              ></Image>
            </div>
          )}
          <div
            className={`mt-4  ${
              !isFetching && data
                ? 'grid flex-grow grid-cols-5 grid-rows-2 gap-10'
                : 'w-full'
            }`}
          >
            {!isFetching &&
              data &&
              data.map((player) => {
                return <PlayerCard player={player} key={player.id}></PlayerCard>
              })}
            {isFetching && (
              <div className="align-center mt-4 h-5/6 justify-center">
                <div className=" flex h-full items-center justify-center">
                  <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900 border-white"></div>
                </div>
              </div>
            )}
          </div>
          {!isFetching && data && (
            <div className="flex h-full w-16 items-center justify-center p-4 pr-1">
              <Image
                src={nextPageIcon}
                alt={'next-page-icon'}
                width={67}
                height={68}
              ></Image>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default PlayerSearch
