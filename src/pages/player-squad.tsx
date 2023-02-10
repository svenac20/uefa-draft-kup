import type { NextPage } from 'next'
import Header from '../components/Layout/header'
import { SquadPlayercard } from '../components/squad-player-card'

const PlayerSquad: NextPage = () => {
  return (
    <div className="flex h-screen flex-col">
      <Header></Header>
      <div className="flex flex-grow flex-col gap-10 p-4">
        <div className="grid h-1/4 grid-cols-3 grid-rows-1 justify-center ">
          <SquadPlayercard position="LW" />
          <SquadPlayercard position="ST" />
          <SquadPlayercard position="RW" />
        </div>
        <div className="grid h-1/4 grid-cols-3 grid-rows-1 justify-center">
          <SquadPlayercard position="CM_1" />
          <SquadPlayercard position="CAM" />
          <SquadPlayercard position="CM_2" />
        </div>
        <div className="grid h-1/3 grid-cols-4 grid-rows-1 justify-center">
          <SquadPlayercard position="LB" />
          <SquadPlayercard position="CB_1" />
          <SquadPlayercard position="CB_2" />
          <SquadPlayercard position="RB" />
        </div>
        <div className="grid h-1/3 grid-cols-1 grid-rows-1 justify-center">
          <SquadPlayercard position="GK" />
        </div>
      </div>
    </div>
  )
}

export default PlayerSquad
