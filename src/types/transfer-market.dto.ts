export interface TransferMarketResponse {
  count: Count;
  players?: (PlayersEntity)[] | null;
  clubs?: (ClubsEntity)[] | null;
}
export interface Count {
  players: number;
  coaches: number;
  clubs: number;
  competitions: number;
  referees: number;
}
export interface PlayersEntity {
  id: string;
  playerName: string;
  firstName: string;
  lastName: string;
  alias: string;
  nationImage: string;
  club: string;
  playerImage: string;
}
export interface ClubsEntity {
  id: string;
  league: string;
  competitionID: string;
  competitionName: string;
  name: string;
  logoImage: string;
}
