import { useState } from 'react'
import useGameSettingsStore from '../../store/game-settings-store'

const Header = () => {
  const setPlayerNames = useGameSettingsStore((state) => state.setPlayerNames)
  const selectedPlayer = useGameSettingsStore((state) => state.selectedPlayer)
  const setSelectedPlayer = useGameSettingsStore(
    (state) => state.setSelectedPlayer
  )
  const playerBudget = useGameSettingsStore((state) => state.playersBudget)
  const [showPrice, setShowPrice] = useState(false)

  return (
    <>
      <div className={`flex h-16 items-center justify-around border-b-4`}>
        {useGameSettingsStore((state) =>
          state.playerNames.map((item, index) => (
            <div
              key={index}
              className={`flex h-full flex-auto cursor-pointer items-center justify-around
                ${
                  selectedPlayer == index
                    ? 'border-2 border-b-0 border-white'
                    : ''
                }`}
              onClick={(e) => {
                setSelectedPlayer(index)
              }}
            >
              <input
                type="text"
                className="bg-transparent text-center text-white outline-none"
                placeholder={'Please enter name..'}
                value={item}
                data-key={index}
                onChange={(e) => {
                  setPlayerNames(e.target.value, index)
                }}
              />

              {!showPrice && (
                <button
                  className="rounded bg-white px-2 py-1 font-bold text-slate-700"
                  onClick={(e) => {
                    e.preventDefault()
                    setShowPrice(true)
                  }}
                >
                  Budget
                </button>
              )}
              {showPrice && playerBudget[index] && (
                <span
                  className={`font-bold`}
                  onClick={(e) => {
                    e.preventDefault()
                    setShowPrice(false)
                  }}
                >
                  {playerBudget[index]}M€
                </span>
              )}
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default Header
