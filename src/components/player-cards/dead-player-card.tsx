import deadCard from '../../public/images/DEAD.png'
import Image from 'next/image'

export const DeadPlayerCard = ({ playerImage }: { playerImage: string}) => {
  return (
    <>
      <Image src={deadCard} fill={true} alt="kartica" sizes="100%" />
      {/* Player image section */}
      <div className="absolute top-[30%] left-[15%] -z-10 h-[52%] w-[68%] border-ronud">
        <Image src={playerImage} alt="player-image" fill={true} sizes="100%" />
      </div>{' '}
    </>
  )
}
