import { useState } from 'react';
import { AppShell, Burger, Header, MediaQuery, Navbar, Text, useMantineTheme } from '@mantine/core';
import { TypeBox } from '../components/index/TypeBox'

function Main() {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  return (
    <div>
    <AppShell
      // navbarOffsetBreakpoint controls when navbar should no longer be offset with padding-left
      navbarOffsetBreakpoint="sm"
      // fixed prop on AppShell will be automatically added to Header and Navbar
      fixed
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 300, lg: 400 }}
        >
          <Navbar.Section>{<TypeBox/>}</Navbar.Section>
          <Navbar.Section grow mt="md">{/* Links sections */}</Navbar.Section>
          <Navbar.Section>{/* Footer with user */}</Navbar.Section>
          
        </Navbar>
      }
      header={
        <Header height={70} p="md">
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

            <Text>Lemniskata</Text>
          </div>
        </Header>
      }
    >
      <Text>Map</Text>
    </AppShell>
    </div>
  );
}

export default Main