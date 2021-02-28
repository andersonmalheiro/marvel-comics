import React from 'react';
import {
  Nav,
  NavLogo,
  NavLinks,
  NavAvatar,
  StyledLink,
} from './app-navbar.styles';
import { FlexRow } from 'styles/utils';
import { MdPerson } from 'react-icons/md';

export const AppNavbar = () => {
  return (
    <Nav>
      <FlexRow aligment="center">
        <NavLogo src={'/assets/logo.svg'} />
        <NavLinks>
          <StyledLink href="/">
            <a>Home</a>
          </StyledLink>
        </NavLinks>
      </FlexRow>

      <NavAvatar>
        <MdPerson size={25} color={'#fff'} />
      </NavAvatar>
    </Nav>
  );
};
