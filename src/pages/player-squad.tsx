import type { NextPage } from 'next'
import Header from '../components/Layout/header'
import { SquadPlayercard } from '../components/squad-player-card'
import useGameSettingsStore from '../store/game-settings-store'
import { useEffect } from 'react'
import usePlayerSquadStore from '../store/player-squad-store'

const PlayerSquad: NextPage = () => {
  const index = useGameSettingsStore((state) => state.selectedPlayer)

  return (
    <div className="flex h-screen flex-col">
      <Header></Header>
      <div className="flex flex-grow flex-col gap-10 p-4">
        <div className="grid h-1/4 grid-cols-3 grid-rows-1 justify-center ">
          <SquadPlayercard position="LW" index={index} />
          <SquadPlayercard position="ST" index={index} />
          <SquadPlayercard position="RW" index={index} />
        </div>
        <div className="grid h-1/4 grid-cols-3 grid-rows-1 justify-center">
          <SquadPlayercard position="CM_1" index={index} />
          <SquadPlayercard position="CAM" index={index} />
          <SquadPlayercard position="CM_2" index={index} />
        </div>
        <div className="grid h-1/4 grid-cols-4 grid-rows-1 justify-center">
          <SquadPlayercard position="LB" index={index} />
          <SquadPlayercard position="CB_1" index={index} />
          <SquadPlayercard position="CB_2" index={index} />
          <SquadPlayercard position="RB" index={index} />
        </div>
        <div className="grid h-1/4 grid-cols-1 grid-rows-1 justify-center">
          <SquadPlayercard position="GK" index={index} />
        </div>
      </div>
    </div>
  )
}

export default PlayerSquad
