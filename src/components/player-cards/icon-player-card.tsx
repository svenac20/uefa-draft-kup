import Image from 'next/image'
import iconCard from '../../public/images/ikona-nova.png'

export const IconPlayerCard = ({
  name,
  countryImage,
  playerImage,
  textSmall,
}: {
  name: string
  countryImage: string
  playerImage: string
  textSmall: boolean 
}) => {
  return (
    <>
      <Image src={iconCard} fill={true} alt="kartica" sizes="100%" />

      {/* Player image section */}
      <div className="absolute top-[12%] left-[18%] -z-10 h-[52%] w-[60%]">
        <Image src={playerImage} alt="player-image" fill={true} sizes="100%" />
      </div>

      {/* Player name section */}
      <div className={`absolute z-10 h-[10%] w-[82%] text-center align-middle ${textSmall ? 'text-sm bottom-[23%] left-[9%]' : 'text-2xl bottom-[21%] left-[8%]'} font-bold`}>
        <div className="w-full h-full align-middle">{name}</div>
      </div>

      {/* Country image section */}
      <div className="absolute bottom-[2%] right-[25%] -z-10 h-[23%] w-[50%]">
        <div className="relative h-full w-full clip-icon">
          <Image
            src={countryImage}
            alt="player-nation"
            fill={true}
            sizes="100%"
          />
        </div>
      </div>
    </>
  )
}
