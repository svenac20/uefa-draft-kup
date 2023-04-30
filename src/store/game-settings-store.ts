import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface GameSettingsState {
  numberOfPlayers: number
  selectedPlayer: number
  playerNames: Array<string>
  playersBudget: Array<number>
  playerPerks: Array<Perks>
  setBudgetAndPlayers: (budget: number, numOfPlayers: number) => void
  setPlayerNames: (name: string, index: number) => void
  setSelectedPlayer: (index: number) => void
  updateBudget: (index: number, playerValue: number) => void
  updatePerk: (index: number, perk: string) => void
  updateBudgetOnPlayerRemoval: (index: number, playerValue: number) => void
}

interface Perks {
  veto: boolean
  icon: boolean
  wheel: boolean
}

const setPlayerName = (
  initalNames: Array<string>,
  index: number,
  name: string
): Array<string> => {
  initalNames[index] = name
  return initalNames
}

const setPlayerBudget = (
  budgets: Array<number>,
  index: number,
  value: number
) => {
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
        playerPerks: [] as Perks[],
        setBudgetAndPlayers: (budget, numOfPlayers) =>
          set((state) => {
            const perks = Array<Perks>(numOfPlayers)
            for (let i = 0; i <numOfPlayers; i++) {
              perks[i] = {icon: false, veto: false, wheel: false}
            }
            
            return {
              numberOfPlayers: numOfPlayers,
              playerNames: Array<string>(numOfPlayers).fill(''),
              playersBudget: Array<number>(numOfPlayers).fill(budget),
              playerPerks: perks,
            }
          }),
        setPlayerNames: (name, index) =>
          set((state) => ({
            playerNames: setPlayerName(state.playerNames, index, name),
          })),
        setSelectedPlayer(index) {
          set(() => ({ selectedPlayer: index }))
        },
        updateBudget(index, playerValue) {
          set((state) => ({
            playersBudget: setPlayerBudget(
              state.playersBudget,
              index,
              playerValue
            ),
          }))
        },
        updatePerk(index, perkKey) {
          set((state) => {
            const key = perkKey as keyof Perks
            const perkForPlayer = state.playerPerks[index]
            if (!perkForPlayer) {
              return state
            }
            
            perkForPlayer[key] = !perkForPlayer[key]
            state.playerPerks[index] = perkForPlayer
            return { playerPerks: state.playerPerks}
          })
        },
        updateBudgetOnPlayerRemoval(index, playerValue) {
           set((state) => {
            const budget = state.playersBudget
            budget[index] += playerValue
            return {playersBudget: budget}
           }) 
        },
      }),
      {
        name: 'game-settings',
      }
    )
  )
)

export default useGameSettingsStore
