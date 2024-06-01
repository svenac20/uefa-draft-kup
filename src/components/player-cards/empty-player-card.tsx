import Link from "next/link"
import Image from "next/image"
import card from '../../public/images/BASECARD.png'

export const EmptyPlayerCard = ({position} : {position: string}) => {
  return (
    <>
      <div className="flex cursor-pointer items-center justify-center">
        <div className="relative h-full w-56 max-w-xs rounded-md opacity-70">
          <Link href={`/player-search/${position}`}>
            <Image src={card} fill={true} alt="kartica" sizes="100%" />
          </Link>
        </div>
      </div>{' '}
    </>
  )
}
