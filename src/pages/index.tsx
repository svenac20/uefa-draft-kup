import { type NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useGameSettingsStore from '../store/game-settings-store'
import usePlayerSquadStore from '../store/player-squad-store'
import Image from 'next/image'
import background from '../public/images/background-entry-screen.png'

const Home: NextPage = () => {
  const [numberOfPlayers, setNumberOfPlayers] = useState(0)
  const [budget, setBudget] = useState(0)
  const router = useRouter()
  const setBudgetAndPlayers = useGameSettingsStore(state => state.setBudgetAndPlayers)
  const setPlayers = usePlayerSquadStore(state => state.setNumberOfPlayers)

  const startGame = () => {
    setBudgetAndPlayers(budget, numberOfPlayers)
    setPlayers(numberOfPlayers)
    router.push('/player-squad')
  }

  return (
    <div className="align-center flex h-full w-full justify-center p-4 relative">
      <Image src={background} alt={"background"} fill={true} className='-z-10'></Image>
      <div className="flex  flex-col justify-center gap-14 absolute top-[30%] w-[20%]">
        <div className="w-full">
          <label htmlFor="players" className="block font-bold">
            Enter number of players:
          </label>
          <input
            type="number"
            id="players"
            name="players"
            className="mt-0 h-10 rounded pl-2 text-black w-full"
            onChange={(e) => setNumberOfPlayers(Number(e.target.value))}
          ></input>
        </div>
        <div>
          <label htmlFor="budget" className="block font-bold">
            Enter budget (in M):
          </label>
          <input
            type="number"
            id="budget"
            name="budget"
            className="mt-0 h-10 rounded pl-2 text-black w-full"
            onChange={(e) => setBudget(Number(e.target.value))}
          ></input>
        </div>
        <button
          className="bg-black-100 mt-6 h-10 rounded border-2 font-bold cursor-pointer"
          onClick={startGame}
        >
          Start game
        </button>
      </div>
    </div>
  )
}

export default Home
