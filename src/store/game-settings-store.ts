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
  increaseBudget: (index: number, increase: number) => void
  updatePerk: (index: number, perk: string) => void
  updateBudgetOnPlayerRemoval: (index: number, playerValue: number) => void
}

interface Perks {
  icon: boolean
  wheel: boolean
  reroll: boolean
  u21: boolean
}

const setPlayerName = (
  initalNames: Array<string>,
  index: number,
  name: string
): Array<string> => {
  initalNames[index] = name
  return initalNames
}

const addMoneyToPlayer = (amount: number, index: number) => {
  return;
}

const setPlayerBudget = (
  budgets: Array<number>,
  index: number,
  value: number
) => {
  budgets[index]! -= isNaN(value) ? 0 : value
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
        playerPerks: [{}] as Perks[],
        setBudgetAndPlayers: (budget, numOfPlayers) => {
          const playerPerks: Array<Perks> = []
          for (let i = 0; i < numOfPlayers; i++) {
            playerPerks.push({
              icon: false,
              wheel: false,
              reroll: false,
              u21: false,
            })
          }

          set({
            numberOfPlayers: numOfPlayers,
            playerNames: Array<string>(numOfPlayers).fill(''),
            playersBudget: Array<number>(numOfPlayers).fill(budget),
            playerPerks,
            selectedPlayer: 0,
          })
        },
        setPlayerNames: (name, index) =>
          set((state) => ({
            playerNames: setPlayerName([...state.playerNames], index, name),
          })),
        setSelectedPlayer: (index) => {
          set({ selectedPlayer: index })
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
        increaseBudget(index, increase) {
          set((state) => {
            const newBudgets = [...state.playersBudget];
            newBudgets[index]! += increase
            return { playersBudget: newBudgets };
          })
        },
        updatePerk(index, perkKey) {
          set((state) => {
            const key = perkKey as keyof Perks
            const playerPerks = [...state.playerPerks]
            const perkForPlayer = playerPerks[index]

            if (perkForPlayer) {
              perkForPlayer[key] = !perkForPlayer[key]
              playerPerks[index] = perkForPlayer
              return { playerPerks: playerPerks }
            }
            return state
          })
        },
        updateBudgetOnPlayerRemoval(index, playerValue) {
          set((state) => {
            const budget = state.playersBudget
            budget[index]! += playerValue
            return { playersBudget: budget }
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
