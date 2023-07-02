import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { type AppType } from 'next/app'

import { trpc } from '../utils/trpc'

import Header from '../components/Layout/header'
import '../styles/globals.css'
import { constants } from '../types/local-storage.constants'

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {

  return (
    <SessionProvider session={session}>
      <div className="h-screen w-screen" >
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  )
}

export default trpc.withTRPC(MyApp)
