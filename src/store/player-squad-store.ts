import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { PlayerPosition } from '../types/player-positions'
import type { UpdateSquad } from '../types/update-squad.interface'

interface PlayerSquad {
  nubmerOfPlayers: number
  squad: Array<Map<PlayerPosition, SquadPlayer>>
  setNumberOfPlayers: (numberOfPlayers: number) => void
  addPlayerToSquad: (updateEntity: UpdateSquad) => void
  removePlayerFromSquad: (index: number, position: PlayerPosition) => void
}

interface SquadPlayer {
  playerName: string
  playerImage: string
  age: number
  countryImage: string
  marketValue: string
}

const usePlayerSquadStore = create<PlayerSquad>()(
  devtools(
    persist(
      (set) => ({
        nubmerOfPlayers: 0,
        squad: [],
        setNumberOfPlayers: (numberOfPlayers: number) =>
          set(() => ({
            nubmerOfPlayers: numberOfPlayers,
            squad: new Array(numberOfPlayers),
          })),
        addPlayerToSquad: (updateEntity) =>
          set((state) => {
            const playerProfile = updateEntity.playerProfile
            const marketValue = updateEntity.marketValue

            let currentSquad = state.squad[updateEntity.index]
            if (!currentSquad) {
              currentSquad = new Map<PlayerPosition, SquadPlayer>
            }

            currentSquad?.set(updateEntity.position, {
              playerName: playerProfile.playerName,
              age: Number(playerProfile.age),
              countryImage: playerProfile.countryImage,
              playerImage: playerProfile.playerImage,
              marketValue:
                marketValue.marketValue +
                marketValue.marketValueNumeral.toLocaleUpperCase() + " " +
                marketValue.marketValueCurrency.toLocaleUpperCase(),
            })

            state.squad[updateEntity.index] = currentSquad
            return { squad: state.squad }
          }),
        removePlayerFromSquad: (index, position) =>
          set((state) => {
            state.squad[index]?.delete(position)
            return { squad: state.squad }
          }),
      }),
      {
        name: 'player-squad',
      }
    )
  )
)

export default usePlayerSquadStore
