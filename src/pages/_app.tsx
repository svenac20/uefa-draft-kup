import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { type AppType } from 'next/app'

import { trpc } from '../utils/trpc'

import '../styles/globals.css'

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {

  return (
    <SessionProvider session={session}>
      <div className="h-screen font-fifa">
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  )
}

export default trpc.withTRPC(MyApp)
