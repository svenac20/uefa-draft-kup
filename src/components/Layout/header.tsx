import Image from 'next/image'
import { useState } from 'react'
import fortuneWheel from '../../public/images/fortune-wheel.png'
import icon from '../../public/images/soccer-player.png'
import veto from '../../public/images/veto.png'
import yellowCard from '../../public/images/yellow-card.png'
import useGameSettingsStore from '../../store/game-settings-store'

const Header = () => {
  const setPlayerNames = useGameSettingsStore((state) => state.setPlayerNames)
  const selectedPlayer = useGameSettingsStore((state) => state.selectedPlayer)
  const setSelectedPlayer = useGameSettingsStore(
    (state) => state.setSelectedPlayer
  )
  const playerBudget = useGameSettingsStore((state) => state.playersBudget)
  const [showPrice, setShowPrice] = useState(false)
  const updatePerk = useGameSettingsStore((state) => state.updatePerk)

  return (
    <>
      <div className={`flex h-24 items-center justify-around border-b-4`}>
        {useGameSettingsStore((state) =>
          state.playerNames.map((item, index) => (
            <div
              key={index}
              className={`h-full pt-2 cursor-pointer ${
                selectedPlayer == index ? 'border-2 border-white' : 'border-2 border-opacity-10 border-white'
              }`}
              onClick={(e) => {
                setSelectedPlayer(index)
              }}
            >
              <div
                key={index}
                className={`flex flex-auto flex-col pr-1`}
              >
                <div
                  className={`flex h-full flex-auto cursor-pointer items-center justify-around  font-bold`}
                >
                  <input
                    type="text"
                    className="bold bg-transparent text-center text-white outline-none"
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
                        e.stopPropagation()
                      }}
                    >
                      Budget
                    </button>
                  )}
                  {showPrice && playerBudget[index] && (
                    <div
                      className={`font-bold px-2 py-1 ${(playerBudget[index] ?? 0 ) < 0 ? "text-red-600" : ""}`}
                      onClick={(e) => {
                        e.preventDefault()
                        setShowPrice(false)
                        e.stopPropagation()
                      }}
                    >
                      {playerBudget[index]}M€
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-3">
                <div className="flex flex-row justify-around gap-3">
                  <Image
                    src={icon}
                    alt="old-man-icon"
                    height={30}
                    className={`${
                      state.playerPerks[index]?.icon
                        ? 'opacity-40'
                        : 'opacity-100'
                    }`}
                    onClick={(e) => {
                      updatePerk(index, 'icon')
                      e.stopPropagation()
                    }}
                  />
                  <Image
                    src={fortuneWheel}
                    alt="old-man-icon"
                    height={30}
                    className={`${
                      state.playerPerks[index]?.wheel
                        ? 'opacity-40'
                        : 'opacity-100'
                    }`}
                    onClick={(e) => {
                      updatePerk(index, 'wheel')
                      e.stopPropagation()
                    }}
                  />
                  <Image
                    src={veto}
                    alt="old-man-icon"
                    height={30}
                    className={`${
                      state.playerPerks[index]?.veto
                        ? 'opacity-40'
                        : 'opacity-100'
                    }`}
                    onClick={(e) => {
                      updatePerk(index, 'veto')
                      e.stopPropagation()
                    }}
                  />
                  <Image
                    src={yellowCard}
                    alt="yellow-card"
                    height={30}
                    className={`${
                      state.playerPerks[index]?.yellowCard
                        ? 'opacity-40'
                        : 'opacity-100'
                    }`}
                    onClick={(e) => {
                      updatePerk(index, 'yellowCard')
                      e.stopPropagation()
                    }}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default Header
