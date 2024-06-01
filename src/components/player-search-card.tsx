import Image from 'next/image'
import {
  MarketValueDevelopmentEntity,
  PlayerProfile,
  PlayersEntity,
} from '../types/transfer-market.dto'
import { useState } from 'react'
import { trpc } from '../utils/trpc'
import { PlayerSelectModal } from './player-select-modal'
import { getMarketValue } from '../utils/formatters'
import card from '../public/images/BASECARD.png'
import u21Card from '../public/images/U21-card.png'
import oldManIcon from '../public/images/starac-kartica.png'
import { retiredClubName } from '../types/country-codes'
import { IconPlayerCard } from './icon-player-card'

export const PlayerSearchCard = ({
  player,
  selectedPlayer,
}: {
  player: PlayersEntity
  selectedPlayer: (
    player: PlayerProfile,
    marketValue: MarketValueDevelopmentEntity,
    isDeadPick: boolean
  ) => void
}) => {
  const [showModal, setShowModal] = useState(false)
  const { data, isFetching, refetch } = trpc.playerSearch.playerValue.useQuery(
    { id: player.id.toString() },
    {
      enabled: false,
    }
  )

  const fetchPlayerPrice = (e: React.MouseEvent) => {
    refetch()
    e.stopPropagation()
  }

  const onModalConfirm = (isDeadPick:boolean) => {
    if (data) {
      selectedPlayer(data?.playerProfile, data?.marketValue, isDeadPick)
    }
  }

  const getPlayerImage = () => {
    if (!data) {
      return card
    }
    const age = parseInt(data.marketValue.age)
    if (age <= 21) {
      return u21Card
    }
    if (age >= 32) {
      return oldManIcon
    }
    return card
  }

  return (
    <>
      <PlayerSelectModal
        show={showModal}
        showModal={setShowModal}
        showDeadPick={true}
        onModalConfirm={onModalConfirm}
      />
      <div
        className={`relative h-full cursor-pointer font-fifa ${
          isFetching ? 'opacity-70' : ''
        }`}
        onClick={() => setShowModal(true)}
      >
        {!data ||
        (data.playerProfile.club != retiredClubName &&
          !data.playerProfile.club.includes('---')) ? (
          <>
            <Image
              src={getPlayerImage()}
              fill={true}
              alt="kartica"
              sizes="100%"
            />
            {isFetching ? (
              <div
                role="status"
                className="absolute top-2/4 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2"
              >
                <svg
                  aria-hidden="true"
                  className="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            ) : (
              <></>
            )}
            {/* Player image section */}
            <div>
              <div className="absolute top-[12%] left-[17%] -z-10 h-[52%] w-[62%]">
                <Image
                  src={player.playerImage.replace('medium', 'big')}
                  alt="player-image"
                  fill={true}
                  sizes="100%"
                  className={`${isFetching ? 'opacity-70' : ''}`}
                />
              </div>

              {/* Market value section */}
              <div className="absolute right-[5%] top-[49%] flex  h-[14%] max-w-[25%] items-center justify-center rounded-full align-middle text-base">
                {!data ? (
                  <button
                    className="h-full rounded-full p-2  py-2.5 text-center text-base font-bold text-white hover:bg-yellow-600"
                    onClick={fetchPlayerPrice}
                  >
                    <span>Show info</span>
                  </button>
                ) : (
                  <div className={`mr-2 text-2xl font-bold`}>
                    <span>
                      {getMarketValue(
                        data.marketValue.marketValue,
                        data.marketValue.marketValueNumeral,
                        data.marketValue.marketValueCurrency
                      )}
                    </span>
                  </div>
                )}
              </div>

              {/*Player age section*/}
              {data ? (
                <div className="absolute right-[19%] top-[15%] z-10 text-3xl">
                  <span className={`font-outline-0 text-[1.4em] font-bold`}>
                    {data.playerProfile.age}
                  </span>
                </div>
              ) : (
                <></>
              )}

              {/* Player name section */}
              <div className="absolute bottom-[26%] left-[7%] z-10 flex h-[9%] w-[82%] flex-row justify-center align-middle text-2xl font-bold">
                <div className=" w-full pt-2 text-center align-middle">
                  {player.playerName}
                </div>
              </div>

              {/* Country image section */}
              {data ? (
                <div className="absolute bottom-[5%] right-[10%] -z-10 h-[21%] w-[41%]">
                  <div className="relative h-full w-full [clip-path:polygon(0_0,100%_0,100%_51%,0_100%)]">
                    <Image
                      src={data.playerProfile.countryImage}
                      alt="player-nation"
                      fill={true}
                      sizes="100%"
                    />
                  </div>
                </div>
              ) : (
                <></>
              )}
              {/* clubImage section */}
              {data ? (
                <div className="absolute bottom-[6%] left-[22%] z-10 h-[21%] w-[20%]">
                  <div className="h-full">
                    <Image
                      src={data.playerProfile.clubImage.replace(
                        'medium',
                        'big'
                      )}
                      alt="player-nation"
                      fill={true}
                      style={{ objectFit: 'contain' }}
                      sizes="100%"
                    />
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </>
        ) : (
          <IconPlayerCard
            name={data.playerProfile.playerName}
            countryImage={data.playerProfile.countryImage}
            playerImage={data.playerProfile.playerImage.replace(
              'medium',
              'big'
            )}
            textSmall={false}
          />
        )}
      </div>
    </>
  )
}
