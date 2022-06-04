import { AuthProvider } from "./contexts/AuthContexts"
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { MatchMediaBreakpoints } from 'react-hook-breakpoints'
import '../styles/globals.css'

const breakpoints = {
  mobile: 414,
  desktop: 415
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <MatchMediaBreakpoints breakpoints={breakpoints}>
        <AuthProvider>
          <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link href="https://fonts.googleapis.com/css2?family=Calistoga&family=Inter:wght@400;500;600;700&display=swap" />
            <title>My Delivery</title>
          </Head>
          <Component {...pageProps} />
        </AuthProvider>
      </MatchMediaBreakpoints>
    </>
  )
}

export default MyApp