import React, { useEffect, useState } from 'react'
import { number } from 'zod'
import useGameSettingsStore from '../../store/game-settings-store'
import { constants } from '../../types/local-storage.constants'
import usePlayerSquadStore from '../../store/player-squad-store'

const Header = ({
  onPlayerChange,
}: {
  onPlayerChange: (selectedPlayerIndex: number) => void
}) => {
  const numberOfPlayers = useGameSettingsStore((state) => state.numberOfPlayers)
  const setPlayerNames = useGameSettingsStore((state) => state.setPlayerNames)
  const selectedPlayer = useGameSettingsStore((state) => state.selectedPlayer)
  const setSelectedPlayer = useGameSettingsStore(
    (state) => state.setSelectedPlayer
  )
  const res = Array.from(Array(numberOfPlayers).keys())
  const playerNames = useGameSettingsStore((state) => state.playerNames)
  const playerBudget = useGameSettingsStore((state) => state.playersBudget)
  const playerSquad = usePlayerSquadStore((state) => state.squad)

  const [showPrice, setShowPrice] = useState(false)

  return (
    <>
      {numberOfPlayers > 0 && (
        <div className={`flex h-16 items-center justify-around border-b-4`}>
          {res.map((number) => {
            return (
              <div
                data-key={number}
                key={number}
                className={`flex h-full flex-auto cursor-pointer items-center justify-around
                ${
                  selectedPlayer == number
                    ? 'border-2 border-b-0 border-white'
                    : ''
                }`}
                onClick={(e) => {
                  setSelectedPlayer(
                    Number(
                      (e.target as HTMLDivElement).getAttribute('data-key')
                    )
                  )
                }}
              >
                <input
                  type="text"
                  className="bg-transparent text-center text-white outline-none"
                  placeholder={'Please enter name..'}
                  value={playerNames[number]}
                  data-key={number}
                  onChange={(e) => {
                    playerNames[number] = e.target.value
                    setPlayerNames(
                      e.target.value,
                      Number(e.target.getAttribute('data-key'))
                    )
                  }}
                />

                { !showPrice  &&
                  <button className="rounded bg-white px-2 py-1 font-bold text-slate-700" onClick={(e) => setShowPrice(true)}>
                    Budget
                  </button>
                }
                {
                  showPrice &&
                   <span className="font-bold" onClick={(e) => setShowPrice(false)}>
                    {playerBudget[number]}M€
                   </span>
                }
              </div>

            )
          })}
        </div>
      )}
    </>
  )
}

export default Header
