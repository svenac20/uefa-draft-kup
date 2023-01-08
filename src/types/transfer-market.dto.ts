export interface PlayerSearchReponse{
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
  id: number;
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

export interface PlayerValueResponse {
  share: Share;
  marketValueDevelopment?: (MarketValueDevelopmentEntity)[] | null;
}
export interface Share {
  title: string;
  url: string;
  description: string;
}
export interface MarketValueDevelopmentEntity {
  date: string;
  unformattedDate: string;
  age: string;
  marketValue: string;
  marketValueUnformatted: number;
  marketValueCurrency: string;
  marketValueNumeral: string;
  clubID: string;
  clubName: string;
  clubShortName: string;
  clubImage: string;
  seasonID: string;
}
