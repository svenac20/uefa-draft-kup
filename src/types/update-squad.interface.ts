import type { PlayerPosition } from './player-positions'
import type {
  MarketValueDevelopmentEntity,
  PlayerProfile,
} from './transfer-market.dto'

export interface UpdateSquad {
  index: number
  position: PlayerPosition
  playerProfile: PlayerProfile
  marketValue: MarketValueDevelopmentEntity
}
