import { useState } from 'react';
import { AppShell, Burger, Header, MediaQuery, Navbar, Text, useMantineTheme, Box } from '@mantine/core';
// import { DataForm } from '../components/index/DataForm'
import React from 'react'
import dynamic from 'next/dynamic'
import { Map, Marker, ZoomControl } from "pigeon-maps"
// import Leaf from '../components/index/Leaf'
function Main() {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const position = [51.505, -0.09]

  const MyAwesomeMap = dynamic(() => import('../components/index/Leaf'), { ssr: false });

  function mapTiler (x, y, z) {
    return `https://trek.nasa.gov/tiles/Mars/EQ/Mars_MOLA_blend200ppx_HRSC_ClrShade_clon0dd_200mpp_lzw/1.0.0//default/default028mm/${x}/${y}/${z}.jpg`
  }
  // http://moontrek.jpl.nasa.gov/trektiles/Moon/EQ/LRO_WAC_Mosaic_Global_303ppd_v02/1.0.0/default/default028mm/0/0/0.jpg?api_key=6BaJSTfT8toGrjcyJwImEvSg2aofL9bOVYpVYL8d
  return (
    <div>
    
      <Box>
      {/* <Map provider={mapTiler} height={300} defaultCenter={[5, 5]} defaultZoom={5}>
      <ZoomControl />
      </Map> */}

        <MyAwesomeMap/>
    </Box>
    </div>
  );
}

export default Main