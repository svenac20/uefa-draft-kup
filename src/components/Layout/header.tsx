import Image from 'next/image'
import { useState } from 'react'
import { env } from '../../env/server.mjs'
import reroll from '../../public/images/dices.png'
import fortuneWheel from '../../public/images/fortune-wheel.png'
import money from '../../public/images/money.png'
import icon from '../../public/images/soccer-player.png'
import u21 from '../../public/images/u21.png'
import useGameSettingsStore from '../../store/game-settings-store'
import { useStoreHook } from '../../store/useStoreHook'

const Header = () => {
  const setPlayerNames = useGameSettingsStore(state => state.setPlayerNames)
  const setSelectedPlayer = useGameSettingsStore(state => state.setSelectedPlayer)
  const updatePerk =useGameSettingsStore(state => state.updatePerk)
  const addMoney = useGameSettingsStore(state => state.increaseBudget)

  const selectedPlayer = useStoreHook(useGameSettingsStore, (state) => state.selectedPlayer)
  const playerBudget = useStoreHook(useGameSettingsStore, (state) => state.playersBudget)
  const playerNames = useStoreHook(useGameSettingsStore, (state) => state.playerNames)
  const playerPerks = useStoreHook(useGameSettingsStore, (state) => state.playerPerks)
  const [showPrice, setShowPrice] = useState(false)

  return (
    <>
      { !playerNames ? <div>Nothing</div> :
      <div className={`flex h-24 items-center justify-around border-b-4 font-fifa`}>
          {playerNames.map((item, index) => (
            <div
              key={index}
              className={`h-full pt-2 cursor-pointer  ${
                selectedPlayer == index ? 'border-2 border-white' : 'border-2 border-opacity-10 border-white'
              }`}
              onClick={() => {
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
                      className="rounded bg-white px-2 py-1 font-bold text-slate-700 font-mono"
                      onClick={(e) => {
                        e.preventDefault()
                        setShowPrice(true)
                        e.stopPropagation()
                      }}
                    >
                      €
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
                      playerPerks[index]?.icon
                        ? 'opacity-40'
                        : 'opacity-100'
                    }`}
                    onClick={(e) => {
                      // updatePerk(index, 'icon')
                      e.stopPropagation()
                    }}
                  />
                  <Image
                    src={fortuneWheel}
                    alt="old-man-icon"
                    height={30}
                    className={`${
                      playerPerks[index]?.wheel
                        ? 'opacity-40'
                        : 'opacity-100'
                    }`}
                    onClick={(e) => {
                      updatePerk(index, 'wheel')
                      if (e.ctrlKey) {
                        window.open(env.NEXT_PUBLIC_WHEEL_LINK) 
                      }
                      e.stopPropagation()
                    }}
                  />
                  <Image
                    src={reroll}
                    alt="yellow-card"
                    height={30}
                    className={`${
                      playerPerks[index]?.reroll
                        ? 'opacity-40'
                        : 'opacity-100'
                    }`}
                    onClick={(e) => {
                      updatePerk(index, 'reroll')
                      e.stopPropagation()
                    }}
                  />
                  <Image
                    src={u21}
                    alt="u21"
                    height={30}
                    className={`${
                      playerPerks[index]?.u21
                        ? 'opacity-40'
                        : 'opacity-100'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                  />
                  <Image
                    src={money}
                    alt="money"
                    height={30}
                    className={`cursor-pointer ${
                      playerPerks[index]?.money
                        ? 'opacity-40'
                        : 'opacity-100'}`}
                    onClick={(e) => {
                      if (playerPerks[index]?.money) {
                        return;
                      }
                      updatePerk(index, "money")
                      addMoney(index, 30)
                      e.stopPropagation()
                    }}
                  >
                  </Image>
                </div>
              </div>
            </div>
          ))}
      </div> }
    </>
  )
}

export default Header
