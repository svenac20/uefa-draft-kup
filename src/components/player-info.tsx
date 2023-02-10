import React from 'react'
import Image from 'next/image.js'

import type {
  MarketValueDevelopmentEntity,
  PlayerProfile,
} from '../types/transfer-market.dto'

function PlayerInfo({
  marketValue,
  playerInfo,
}: {
  marketValue: MarketValueDevelopmentEntity | undefined
  playerInfo: PlayerProfile | undefined
}) {
  return (
    <div className="flex h-full w-full flex-row">
      <div className="h-1/4 w-1/6">
        <div className="relative h-full w-full items-center rounded">
          <Image
            src={playerInfo?.countryImage || ''}
            alt={'previous-page-icon'}
            fill={true}
            className="rounded"
          ></Image>
        </div>
        <div className="mt-1 text-center text-xs">
          {playerInfo?.countryShortName}
        </div>
      </div>
      <div className="w-5/6 flex-col">
        <div className="text-center">{playerInfo?.age}</div>
        <div className="text-md w-5/6 pl-4 text-center">{playerInfo?.club}</div>
        <div className="flex w-full flex-row items-center justify-center p-2">
          {marketValue?.marketValue}
          {marketValue?.marketValueNumeral.toLocaleUpperCase()}{' '}
          {marketValue?.marketValueCurrency}
        </div>
      </div>
    </div>
  )
}

export default PlayerInfo
