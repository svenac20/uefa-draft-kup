import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { PlayerPosition } from '../types/player-positions'
import type { UpdateSquad } from '../types/update-squad.interface'
import { getMarketValue } from '../utils/formatters'

const usePlayerSquadStore = create<PlayerSquad>()(
  devtools(
    persist(
      (set) => ({
        numberOfPlayers: 0,
        squad: [],
        setNumberOfPlayers: (numberOfPlayers: number) =>
          set(() => {
            return {
              numberOfPlayers: numberOfPlayers,
              squad: new Array(numberOfPlayers),
            }
          }),
        addPlayerToSquad: (updateEntity, isDeadPick) =>
          set((state) => {
            const { index, playerProfile, marketValue } = updateEntity
            const playerSquad = [...state.squad]

            const currentSquad =
              (playerSquad[index] as Map<PlayerPosition, SquadPlayer>) ||
              new Map<PlayerPosition, SquadPlayer>()

            currentSquad.set(updateEntity.position, {
              playerName: playerProfile.playerName,
              age: Number(playerProfile.age),
              countryImage: playerProfile.countryImage,
              playerImage: playerProfile.playerImage,
              marketValue: getMarketValue(playerProfile.marketValue, playerProfile.marketValueNumeral, playerProfile.marketValueCurrency),
              club: playerProfile.club,
              clubImage: playerProfile.clubImage.replace("medium", "big"),
              isDeadPick: isDeadPick
            })

            playerSquad[index] = currentSquad
            return { squad: playerSquad }
          }),
        removePlayerFromSquad: (index, position) =>
          set((state) => {
            const playerSquad = [...state.squad]
            const playerMap = playerSquad[index]

            if (!playerMap) {
              return state
            }

            playerMap.delete(position)

            return { squad: playerSquad }
          }),
      }),
      {
        name: 'player-squad',
        serialize: (data) => {
          return JSON.stringify({
            ...data,
            state: {
              ...data.state,
              squad: data.state.squad ? data.state.squad.map((test) => test ? Object.fromEntries(test) : {}) : []
            },
          })
        },
        deserialize: (value) => {
          const data = JSON.parse(value)

          data.state.squad = data.state.squad.map((obj: any) => new Map(Object.entries(obj)))

          return data
        },
      }
    )
  )
)

interface PlayerSquad {
  numberOfPlayers: number
  squad: Array<Map<PlayerPosition, SquadPlayer>>
  setNumberOfPlayers: (numberOfPlayers: number) => void
  addPlayerToSquad: (updateEntity: UpdateSquad, isDeadPick: boolean) => void
  removePlayerFromSquad: (index: number, position: PlayerPosition) => void
}

export interface SquadPlayer {
  playerName: string
  playerImage: string
  age: number
  countryImage: string
  marketValue: string
  club: string
  clubImage: string
  isDeadPick: boolean
}

export default usePlayerSquadStore
