import React, { useState } from 'react';
import { Container, ToggleDrawerBtn } from './drawer.styles';

interface DrawerProps {
  title: string;
  children: any;
}

export const useDrawer = (show = false): [boolean, () => void] => {
  const [open, setOpen] = useState(show);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return [open, toggleDrawer];
};

export const Drawer = (props: DrawerProps) => {
  const { children, title } = props;
  const [open, toggleDrawer] = useDrawer();

  return (
    <React.Fragment>
      <ToggleDrawerBtn onClick={() => toggleDrawer()}>
        {open ? 'close' : 'open'}
      </ToggleDrawerBtn>

      <Container
        style={{
          width: open ? '350px' : '0',
          padding: open ? '1em' : '0',
        }}
      >
        {open && (
          <React.Fragment>
            <h1>{title}</h1>
            {children}
          </React.Fragment>
        )}
      </Container>
    </React.Fragment>
  );
};
