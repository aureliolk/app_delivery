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
        <AuthProvider >
          <Component {...pageProps} />
        </AuthProvider>
      </MatchMediaBreakpoints>
    </>
  )
}

export default MyApp