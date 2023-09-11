import { router } from "../trpc";
import { playerSearchRouter } from "./player-search.router";

export const appRouter = router({
  playerSearch: playerSearchRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
