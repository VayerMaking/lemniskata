import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MantineProvider, Button } from '@mantine/core';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={{ fontFamily: 'Open Sans' }}>
      < Component {...pageProps} />
      <Button>test button</Button>
    </MantineProvider>
  )


}

export default MyApp
