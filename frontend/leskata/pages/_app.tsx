import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MantineProvider, Button } from '@mantine/core';
import { AppShell, Navbar, Header } from '@mantine/core';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <MantineProvider theme={{ fontFamily: 'Open Sans' }}>
      < Component {...pageProps} />
    </MantineProvider>
    </>
  )


}

export default MyApp
