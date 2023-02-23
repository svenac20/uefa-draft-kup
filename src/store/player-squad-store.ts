import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { PlayerPosition } from '../types/player-positions'
import { UpdateSquad } from '../types/update-squad.interface'
import { SquadPlayercard } from '../components/squad-player-card'

interface PlayerSquad {
  nubmerOfPlayers: number
  squad: Array<Map<PlayerPosition, SquadPlayer>>
  setNumberOfPlayers: (numberOfPlayers: number) => void
  addPlayerToSquad: (updateEntity: UpdateSquad) => void
}

interface SquadPlayer {
  playerName: string
  playerImage: string
  age: number
  countryImage: string
  marketValue: string
}

const updateSquad = (
  squad: Array<Map<PlayerPosition, SquadPlayer>>,
  updateEntity: UpdateSquad
) => {
  const currentSquad = squad[updateEntity.index] ?? new Map<PlayerPosition, SquadPlayer>()
  const playerProfile = updateEntity.playerProfile
  const marketValue = updateEntity.marketValue


  currentSquad?.set(updateEntity.position, {
    playerName: playerProfile.playerName,
    age: Number(playerProfile.age),
    countryImage: playerProfile.countryImage,
    playerImage: playerProfile.playerImage,
    marketValue:
      marketValue.marketValue +
      marketValue.marketValueNumeral.toLocaleUpperCase() +
      marketValue.marketValueCurrency.toLocaleUpperCase(),
  })

  console.log("INDEX JE " + updateEntity.index)
  squad[updateEntity.index] = currentSquad 

  console.log(squad)

  return squad
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
          set((state) => ({
            squad: updateSquad(state.squad, updateEntity),
          })),
      }),
      {
        name: 'player-squad',
      }
    )
  )
)

export default usePlayerSquadStore
