import { AuthProvider } from "./contexts/AuthContexts"
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <AuthProvider>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link href="https://fonts.googleapis.com/css2?family=Calistoga&family=Inter:wght@400;500;600;700&display=swap"/>
          <title>My Delivery</title>
        </Head>
        <Component {...pageProps} />
    </AuthProvider> 
    </>
  )
}

export default MyApp
