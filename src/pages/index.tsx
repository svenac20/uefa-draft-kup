import { type NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useGameSettingsStore from '../store/game-settings-store'
import usePlayerSquadStore from '../store/player-squad-store'

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
    <div className="align-center flex h-full w-full justify-center p-4">
      <div className="flex flex-col justify-center gap-5">
        <div>
          <label htmlFor="players" className="block font-bold">
            Enter number of players:
          </label>
          <input
            type="number"
            id="players"
            name="players"
            className="mt-0 h-10 rounded pl-2 text-black"
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
            className="mt-0 h-10 rounded pl-2 text-black"
            onChange={(e) => setBudget(Number(e.target.value))}
          ></input>
        </div>
        <button
          className="bg-black-100 mt-2 h-10 rounded border-2 font-bold"
          onClick={startGame}
        >
          Start game
        </button>
      </div>
    </div>
  )
}

export default Home
