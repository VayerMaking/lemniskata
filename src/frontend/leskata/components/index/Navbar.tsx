import { useState } from 'react';
import { AppShell, Burger, Header, MediaQuery, Navbar, Text, useMantineTheme, Checkbox } from '@mantine/core';
import dynamic from 'next/dynamic'

export function Nav() {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  const Map = dynamic(() => import('./Leaf'), { ssr: false });
  const [checkedTerrain, setCheckTerrain] = useState(false);
  const [checkedWeather, setCheckWeather] = useState(false);

  return (
    <AppShell
      // navbarOffsetBreakpoint controls when navbar should no longer be offset with padding-left
      navbarOffsetBreakpoint="sm"
      // fixed prop on AppShell will be automatically added to Header and Navbar
      fixed
      navbar={
        <Navbar
          p="md"
          // Breakpoint at which navbar will be hidden if hidden prop is true
          hiddenBreakpoint="sm"
          // Hides navbar when viewport size is less than value specified in hiddenBreakpoint
          hidden={!opened}
          // when viewport size is less than theme.breakpoints.sm navbar width is 100%
          // viewport size > theme.breakpoints.sm – width is 300px
          // viewport size > theme.breakpoints.lg – width is 400px
          width={{ sm: 300, lg: 300 }}
        >
          <Checkbox style={{paddingBottom:"5px"}} checked={checkedTerrain} onChange={(event) => setCheckTerrain(event.currentTarget.checked)} label="Terrain" />
          <Checkbox checked={checkedWeather} onChange={(event) => setCheckWeather(event.currentTarget.checked)} label="Weather" />
        </Navbar>
      }
      header={
        <Header height={0} p="md">
          {/* Handle other responsive styles with MediaQuery component or createStyles function */}
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            
          </div>
        </Header>
      }
    >
      <Map weather={checkedWeather} terrain={checkedTerrain}/>
    </AppShell>
  );
}