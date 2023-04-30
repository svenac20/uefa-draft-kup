import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface GameSettingsState {
  numberOfPlayers: number
  selectedPlayer: number
  playerNames: Array<string>
  playersBudget: Array<number>
  setBudgetAndPlayers: (budget: number, numOfPlayers: number) => void
  setPlayerNames: (name: string, index: number) => void
  setSelectedPlayer: (index: number) => void
  updateBudget: (index: number, playerValue: number) => void
}

const setPlayerName = (
  initalNames: Array<string>,
  index: number,
  name: string
): Array<string> => {
  initalNames[index] = name
  return initalNames
}

const setPlayerBudget = (budgets: Array<number> ,index: number, value: number) => {
  console.log("PRICE JE " + value)
  budgets[index] -= isNaN(value) ? 0 : value 
  return budgets
}

const useGameSettingsStore = create<GameSettingsState>()(
  devtools(
    persist(
      (set) => ({
        numberOfPlayers: 0,
        selectedPlayer: 0,
        playerNames: [],
        playersBudget: [],
        setBudgetAndPlayers: (budget, numOfPlayers) =>
          set(() => ({
            numberOfPlayers: numOfPlayers,
            playerNames: Array<string>(numOfPlayers).fill(""),
            playersBudget: Array<number>(numOfPlayers).fill(budget),
          })),
        setPlayerNames: (name, index) =>
          set((state) => ({
            playerNames: setPlayerName(state.playerNames, index, name),
          })),
        setSelectedPlayer(index) {
          set(() => ({ selectedPlayer: index }))
        },
        updateBudget(index, playerValue) {
          set((state) => ({playersBudget: setPlayerBudget(state.playersBudget,index, playerValue)}))
        },
      }),
      {
        name: 'game-settings',
      }
    )
  )
)

export default useGameSettingsStore
