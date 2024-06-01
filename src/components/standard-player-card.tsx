import Image, { StaticImageData } from 'next/image'
import { SquadPlayer } from '../store/player-squad-store'

export const StandardPlayerCard = ({
  data,
  image,
}: {
  data: SquadPlayer
  image: StaticImageData 
}) => {
  return (
    <>
      <Image src={image} fill={true} alt="kartica" sizes="100%" />

      {/* AGE section*/}
      <div className="absolute right-[20%] top-[13%] z-50">
        <span className={`font-outline-0 text-[1.4em] font-bold`}>
          {data.age}
        </span>
      </div>

      {/* Player image section */}
      <div className="absolute top-[12%] left-[18%] -z-10 h-[52%] w-[60%]">
        <Image
          src={data.playerImage.replace('medium', 'big')}
          alt="player-image"
          fill={true}
          sizes="100%"
        />
      </div>

      {/* Market value section */}
      <div className="absolute right-[4%] top-[50%] text-base ">
        {data.marketValue}
      </div>

      {/* Player name section */}
      <div className="absolute bottom-[26%] left-4 z-10 flex h-[10%] w-[82%] flex-row text-center align-middle text-base font-bold ">
        <div className="w-full">{data.playerName}</div>
      </div>

      {/* Country image section */}
      <div className="absolute bottom-[4%] right-[11%] z-10 h-[20%] w-[90px]">
        <div className="relative h-full w-full [clip-path:polygon(0_0,100%_0,100%_44%,0_100%)]">
          <Image
            src={data.countryImage}
            alt="player-nation"
            fill={true}
            sizes="100%"
          />
        </div>
      </div>

      {/* clubImage section */}
      <div className="absolute bottom-[6%] left-[24%] z-10 h-[20%] w-[15%]">
        <div className="h-full">
          <Image
            src={data.clubImage}
            alt="player-nation"
            fill={true}
            style={{ objectFit: 'contain' }}
            sizes="100%"
          />
        </div>
      </div>
    </>
  )
}
