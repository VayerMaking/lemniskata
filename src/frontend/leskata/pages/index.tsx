import { useState } from 'react';
import { AppShell, Burger, Header, MediaQuery, Text, useMantineTheme, Box } from '@mantine/core';
// import { DataForm } from '../components/index/DataForm'
import React from 'react'
import dynamic from 'next/dynamic'
import { Map, Marker, ZoomControl } from "pigeon-maps"
import HomePage from './home';
// import Leaf from '../components/index/Leaf'
import { Nav } from '../components/index/Navbar'
function Main() {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const position = [51.505, -0.09]

  return (
    <div>
    
      <Box>
        {/* <HomePage /> */}
        <Nav/>
      </Box>
    </div>
  );
}

export default Main