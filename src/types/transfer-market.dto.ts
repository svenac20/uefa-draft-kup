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
  marketValueDevelopment: MarketValueDevelopmentEntity[];
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

export interface PlayerProfileReponse{
  share: Share;
  playerProfile: PlayerProfile;
}
export interface Share {
  title: string;
  url: string;
  description: string;
}
export interface PlayerProfile {
  playerID: string;
  playerImage: string;
  playerName: string;
  playerFullName: string;
  birthplace: string;
  dateOfBirth: string;
  dateOfDeath?: null;
  playerShirtNumber: string;
  birthplaceCountry: string;
  birthplaceCountryImage: string;
  age: string;
  height: string;
  foot: string;
  internationalTeam: string;
  internationalTeamImage: string;
  internationalTeamStatus: string;
  internationalGames: string;
  internationalGoals: string;
  internationalTeamShortTag: string;
  internationalShirtNumber: string;
  internationalWmMember: boolean;
  internationalValueRank: number;
  country: string;
  countryImage: string;
  countryShortName: string;
  secondCountry: string;
  secondCountryImage: string;
  league: string;
  leagueLogo: string;
  clubImage: string;
  club: string;
  clubID: string;
  contractExpiryDate: string;
  agent: string;
  agentId: string;
  outfitter: string;
  positionGroup: string;
  playerMainPosition: string;
  playerSecondPosition: string;
  playerThirdPosition: string;
  marketValue: string;
  marketValueCurrency: string;
  marketValueNumeral: string;
  marketValueLastChange: string;
  allSuspensions?: (null)[] | null;
}
