import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface GameSettingsState {
  numberOfPlayers: number
  budget: number
  selectedPlayer: number
  playerNames: Array<string>
  setBudgetAndPlayers: (budget: number, numOfPlayers: number) => void
  setPlayerNames: (name: string, index: number) => void
  setSelectedPlayer: (index: number) => void
}

const setPlayerName = (
  initalNames: Array<string>,
  index: number,
  name: string
): Array<string> => {
  initalNames[index] = name
  return initalNames
}

const useGameSettingsStore = create<GameSettingsState>()(
  devtools(
    persist(
      (set) => ({
        numberOfPlayers: 0,
        budget: 0,
        selectedPlayer: 0,
        playerNames: [],
        setBudgetAndPlayers: (budget, numOfPlayers) =>
          set(() => ({
            budget: budget,
            numberOfPlayers: numOfPlayers,
            playerNames: Array<string>(numOfPlayers),
          })),
        setPlayerNames: (name, index) =>
          set((state) => ({
            playerNames: setPlayerName(state.playerNames, index, name),
          })),
      setSelectedPlayer(index) {
          set(() => ({selectedPlayer: index}))
      },
      }),
      {
        name: 'game-settings',
      }
    )
  )
)

export default useGameSettingsStore
