import React, { useEffect, useState } from 'react'
import { number } from 'zod'
import { constants } from '../../types/local-storage.constants'

export default function Header() {
  const [numberOfPlayers, setNumberOfPlayers] = useState(0)
  const res = Array.from(Array(numberOfPlayers).keys()).map((x) => x + 1)

  useEffect(() => {
    const players = Number(localStorage.getItem(constants.NUMBER_OF_PLAYERS))
    setNumberOfPlayers(players)

  }, [])

  return (
    <div className="flex h-16 items-center justify-around border-b-4">
      {res.map((number) => {
        return <div key={number}>Player number {number}</div>
      })}
    </div>
  )
}
