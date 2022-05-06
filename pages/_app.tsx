import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {SessionProvider} from "next-auth/react"
import Head from 'next/head'

function MyApp({ Component, pageProps:{session, ...pageProps} }: AppProps) {
  return(
    <SessionProvider>
      <Head>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />
        <meta name='application-name' content='Twitter' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='Twitter' />
        <meta name='description' content='Twitter' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='msapplication-TileColor' content='#2B5797' />
        <meta name='msapplication-tap-highlight' content='no' />
        <meta name='theme-color' content='#000000' />

        <link rel='android-touch-icon' href='/icons/icon-512x512.png' />
        <link rel='android-touch-icon' sizes='192x192' href='/icons/android-twitter-192x192.png' />
        <link rel='android-touch-icon' sizes='310x310' href='/icons/android-twitter-310x310.png' />
        <link rel='manifest' href='/manifest.json' />
        <link rel='shortcut icon' href='/favicon.ico' />
        <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' />       
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  ) 
}

export default MyApp
