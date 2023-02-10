import Link from 'next/link'
import router from 'next/router'
import React from 'react'
import type { PlayerPosition } from '../types/player-positions'

export const SquadPlayercard = ({ position }: { position: PlayerPosition }) => {
  return (
    <div className="flex items-center justify-center cursor-pointer">
      <Link href={`/player-search/${position}`}>Ovdje ide player</Link>
    </div>
  )
}
