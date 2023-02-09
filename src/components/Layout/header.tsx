import React, { useEffect, useState } from 'react'
import { number } from 'zod'
import useGameSettingsStore from '../../store/game-settings-store'
import { constants } from '../../types/local-storage.constants'

const Header = () => {
  const numberOfPlayers = useGameSettingsStore((state) => state.numberOfPlayers)
  const setPlayerNames = useGameSettingsStore((state) => state.setPlayerNames)
  const selectedPlayer = useGameSettingsStore((state) => state.selectedPlayer)
  const setSelectedPlayer = useGameSettingsStore(
    (state) => state.setSelectedPlayer
  )
  const res = Array.from(Array(numberOfPlayers).keys())

  return (
    numberOfPlayers > 0 && (
      <div className={`flex h-20 items-center justify-around border-b-4`}>
        {res.map((number) => {
          return (
            <div
              data-key={number}
              key={number}
              className={`flex h-full flex-auto cursor-pointer items-center justify-center
                ${
                  selectedPlayer == number
                    ? 'border-2 border-b-0 border-white'
                    : ''
                }`}
              onClick={(e) => {
                setSelectedPlayer(
                  Number((e.target as HTMLDivElement).getAttribute('data-key'))
                )
              }}
            >
              <input
                type="text"
                border-0
                className="bg-transparent text-center text-white outline-none"
                placeholder="Please enter name.."
                data-key={number}
                onChange={(e) =>
                  setPlayerNames(
                    e.target.value,
                    Number(e.target.getAttribute('data-key'))
                  )
                }
              />
            </div>
          )
        })}
      </div>
    )
  )
}

export default Header
