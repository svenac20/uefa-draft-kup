import { useState } from 'react'
import useGameSettingsStore from '../../store/game-settings-store'
import icon from '../../public/images/soccer-player.png'
import fortuneWheel from '../../public/images/fortune-wheel.png'
import veto from '../../public/images/veto.png'
import Image from 'next/image'

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
      <div className={`flex h-20 items-center justify-around border-b-4`}>
        {useGameSettingsStore((state) =>
          state.playerNames.map((item, index) => (
            <div
              key={index}
              className={`flex h-full flex-auto flex-col ${
                selectedPlayer == index
                  ? 'border-2 border-b-0 border-white'
                  : ''
              }`}
            >
              <div
                className={`flex h-full flex-auto cursor-pointer items-center justify-around  font-bold`}
                onClick={(e) => {
                  setSelectedPlayer(index)
                }}
              >
                <input
                  type="text"
                  className="bold bg-transparent text-center text-white outline-none "
                  placeholder={'Please enter name..'}
                  value={item}
                  data-key={index}
                  onChange={(e) => {
                    setPlayerNames(e.target.value, index)
                  }}
                />

                <div className="flex flex-row justify-center  gap-3">
                  <Image
                    key={index}
                    src={icon}
                    alt="old-man-icon"
                    height={30}
                    className={`${
                      state.playerPerks[index]?.icon
                        ? 'opacity-40'
                        : 'opacity-100'
                    }`}
                    onClick={(e) => updatePerk(index, 'icon')}
                  />
                  <Image
                    key={index}
                    src={fortuneWheel}
                    alt="old-man-icon"
                    height={30}
                    className={`${
                      state.playerPerks[index]?.wheel
                        ? 'opacity-40'
                        : 'opacity-100'
                    }`}
                    onClick={(e) => updatePerk(index, 'wheel')}
                  />
                  <Image
                    key={index}
                    src={veto}
                    alt="old-man-icon"
                    height={30}
                    className={`${
                      state.playerPerks[index]?.veto
                        ? 'opacity-40'
                        : 'opacity-100'
                    }`}
                    onClick={(e) => updatePerk(index, 'veto')}
                  />
                </div>

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
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default Header
