import { z } from 'zod'
import { router, publicProcedure } from '../trpc'
import { env } from '../../../env/client.mjs'
import axios from 'axios'
import {
  MarketValueDevelopmentEntity,
  PlayerProfile,
  PlayerProfileReponse,
  PlayerSearchReponse,
  PlayerValueResponse,
} from '../../../types/transfer-market.dto'
import { CountryCodeMap } from '../../../types/country-codes'

export const playerSearchRouter = router({
  searchPlayer: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input }) => {
      if (!input.name) {
        return []
      }
      const options = {
        method: 'GET',
        url: 'https://transfermarket.p.rapidapi.com/search',
        params: {
          query: input.name,
          domain: 'com',
        },
        headers: {
          'X-RapidAPI-Key': env.NEXT_PUBLIC_TRANSFERMARKET_KEY,
          'X-RapidAPI-Host': env.NEXT_PUBLIC_TRANSFERMARKET_HOST,
        },
      }
      const data: PlayerSearchReponse = (await axios.request(options)).data
      const players = data.players
      players?.forEach(
        (player) =>
          (player.playerImage = player.playerImage.replace('medium', 'big'))
      )

      return players?.slice(0, 3)
    }),

  playerValue: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      console.log(input)
      const marketValue = await getPlayerMarketValue(input.id)
      const playerProfile = await getPlayerProfile(input.id)
      
      return {marketValue, playerProfile}
    }),
})

const getPlayerProfile = async (id: string): Promise<PlayerProfile> => {
  const options = {
    method: 'GET',
    url: 'https://transfermarket.p.rapidapi.com/players/get-profile',
    params: { id: id, domain: 'com' },
    headers: {
      'X-RapidAPI-Key': env.NEXT_PUBLIC_TRANSFERMARKET_KEY,
      'X-RapidAPI-Host': env.NEXT_PUBLIC_TRANSFERMARKET_HOST,
    },
  }

  const data: PlayerProfileReponse = (await axios.request(options)).data
  const playerProfile = data.playerProfile

  playerProfile.countryImage = `https://flagcdn.com/w320/${CountryCodeMap.get(
    playerProfile.country
  )?.toLocaleLowerCase()}.png`
  playerProfile.playerImage = playerProfile.playerImage.replace(
    'medium',
    'big'
  )

  return playerProfile;
}

const getPlayerMarketValue = async (
  id: string 
): Promise<MarketValueDevelopmentEntity> => {
  const options = {
    method: 'GET',
    url: 'https://transfermarket.p.rapidapi.com/players/get-market-value',
    params: { id: id, domain: 'com' },
    headers: {
      'X-RapidAPI-Key': env.NEXT_PUBLIC_TRANSFERMARKET_KEY,
      'X-RapidAPI-Host': env.NEXT_PUBLIC_TRANSFERMARKET_HOST,
    },
  }
  const data: PlayerValueResponse = (await axios.request(options)).data

  return (
    data.marketValueDevelopment?.[0] ||
    ({
      marketValueNumeral: 'M',
      marketValue: '0',
      marketValueCurrency: '€',
    } as MarketValueDevelopmentEntity)
  )
}